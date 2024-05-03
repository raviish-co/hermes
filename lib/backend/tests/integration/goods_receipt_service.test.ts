import { describe, expect, it } from "vitest";
import { ItemNotFound } from "../../domain/catalog/items/item_not_found_error";
import { ID } from "../../shared/id";
import { ItemRepositoryStub } from "../stubs/item_repository_stub";
import { SequenceGenerator } from "../../adapters/sequences/sequence_generator";
import { InmemSequenceStorage } from "../../persistense/inmem/inmem_sequence_storage";
import { GoodsReceiptService } from "../../application/goods_receipt_service";
import { InmemGoodsReceiptNoteRepository } from "../../persistense/inmem/inmem_goods_receipt_note_repository";
import { InvalidEntryDate } from "../../domain/goods_receipt/invalid_entry_date_error";
import { InvalidLines } from "../../domain/goods_receipt/invalid_lines_error";
import type { Generator } from "../../adapters/sequences/generator";
import type { Item } from "../../domain/catalog/items/item";
import { ItemStockRepositoryStub } from "../stubs/item_stock_repository_stub";
import type { ItemStockRepository } from "../../domain/warehouse/item_stock_repository";

describe("GoodsReceiptService - Entrada de mercadorias", () => {
    it("Deve retornar um erro **InvalidEntryDate** se a data de entrada de mercadoria não for definida", async () => {
        const data = {
            lines: [
                { itemId: "1001", goodQuantities: 5 },
                { itemId: "1002", goodQuantities: 3 },
            ],
            entryDate: "",
            userId: "1000",
        };

        const { service } = makeService();

        const error = await service.new(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidEntryDate);
    });

    it("Deve retornar um erro **InvaldLines** se as linhas estiverem vazias", async () => {
        const data = {
            lines: [],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const { service } = makeService();

        const error = await service.new(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidLines);
    });

    it("Deve retornar um erro **ItemNotFound** se um item não existir", async () => {
        const data = {
            lines: [{ itemId: "123", goodQuantities: 1 }],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const { service } = makeService();

        const error = await service.new(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(ItemNotFound);
    });

    it("Deve retornar um erro **InvalidLines** se não existirem linhas", async () => {
        const data = {
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const { service } = makeService();

        const error = await service.new(data as any);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidLines);
    });

    it("Deve actualizar a quantidade em estoque dos artigos", async () => {
        const data = {
            lines: [
                { itemId: "1001", goodQuantities: 50, condition: { status: "Bom" } },
                { itemId: "1002", goodQuantities: 20, condition: { status: "Bom" } },
            ],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const { service, itemStockRepository } = makeService();

        await service.new(data);

        const itemIds = [ID.fromString("1001"), ID.fromString("1002")];
        const items = await itemStockRepository.findAll(itemIds);

        expect(items.length).toBe(2);
        expect(items[0].total).toBe(60);
        expect(items[1].total).toBe(30);
    });

    it("Se existir um conjunto de itens em mau estado, o seu número deve ser actualizado no stock", async () => {
        const data = {
            lines: [
                {
                    itemId: "1002",
                    goodQuantities: 50,
                    badQuantities: 10,
                    condition: { status: "Bom" },
                },
                {
                    itemId: "1003",
                    goodQuantities: 20,
                    badQuantities: 15,
                    condition: { status: "Mau" },
                },
            ],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const { service, itemStockRepository } = makeService();

        await service.new(data);

        const itemIds = [ID.fromString("1002"), ID.fromString("1003")];
        const items = await itemStockRepository.findAll(itemIds);

        expect(items.length).toBe(2);
        expect(items[0].total).toBe(70);
        expect(items[0].goodQuantities).toBe(60);
        expect(items[0].badQuantities).toBe(10);
        expect(items[1].total).toBe(42);
        expect(items[1].goodQuantities).toBe(27);
        expect(items[1].badQuantities).toBe(15);
    });

    it("Deve salva a guia de entrada de mercadoria no repositório", async () => {
        const data = {
            lines: [
                { itemId: "1001", goodQuantities: 50, condition: { status: "Bom" } },
                { itemId: "1002", goodQuantities: 20 },
            ],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const { service, goodsReceiptNoteRepository } = makeService();
        await service.new(data);

        const note = await goodsReceiptNoteRepository.last();

        expect(note.lines.length).toBe(2);
        expect(note.lines[0].itemId.toString()).toBe("1001");
        expect(note.lines[1].itemId.toString()).toBe("1002");
    });

    it("Deve registrar na guia de entrada de mercadoria o número de itens em bom estado", async () => {
        const data = {
            lines: [
                { itemId: "1001", goodQuantities: 50, condition: { status: "Bom" } },
                { itemId: "1002", goodQuantities: 20 },
            ],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const { service, goodsReceiptNoteRepository } = makeService();
        await service.new(data);

        const note = await goodsReceiptNoteRepository.last();

        expect(note.lines[0].goodQuantities).toBe(50);
        expect(note.lines[1].goodQuantities).toBe(20);

        expect(note.lines[0].total).toBe(50);
        expect(note.lines[1].total).toBe(20);
    });

    it("Deve registrar na guia de entrada de mercadoria o número de itens em mau estado", async () => {
        const data = {
            lines: [
                {
                    itemId: "1001",
                    goodQuantities: 50,
                    badQuantities: 15,
                    condition: { status: "Bom" },
                },
                {
                    itemId: "1002",
                    goodQuantities: 20,
                    badQuantities: 15,
                    condition: { status: "Mau" },
                },
            ],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const { service, goodsReceiptNoteRepository } = makeService();
        await service.new(data);

        const note = await goodsReceiptNoteRepository.last();

        expect(note.lines[0].badQuantities).toBe(15);
        expect(note.lines[1].badQuantities).toBe(15);

        expect(note.lines[0].total).toBe(65);
        expect(note.lines[1].total).toBe(35);
    });

    it("Deve gerar o ID para a nota de entrada de mercadoria", async () => {
        const data = {
            lines: [
                { itemId: "1001", goodQuantities: 50 },
                {
                    itemId: "1003",
                    goodQuantities: 20,
                    condition: { status: "Mau", comment: "Gola rasgada" },
                },
            ],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const THE_ID = "GS1001";
        const generator = {
            generate: () => THE_ID,
        };
        const { service, goodsReceiptNoteRepository } = makeService({ generator });
        await service.new(data);

        const note = await goodsReceiptNoteRepository.last();

        expect(note.noteId).toBeDefined();
        expect(note.noteId.toString()).toBe(THE_ID);
        expect(note.noteId).toBeInstanceOf(ID);
    });

    it("Deve actualizar a condição dos artigos", async () => {
        const data = {
            lines: [
                { itemId: "1001", goodQuantities: 2, condition: { status: "Bom" } },
                {
                    itemId: "1002",
                    goodQuantities: 2,
                    condition: { status: "Mau", comment: "Gola rasgada" },
                },
            ],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const { service, itemRepository } = makeService();

        service.new(data);

        const item1OrErr = await itemRepository.getById(ID.fromString("1001"));
        const item2OrErr = await itemRepository.getById(ID.fromString("1002"));

        const item1 = <Item>item1OrErr.value;
        const item2 = <Item>item2OrErr.value;

        expect(item1.getCondition().status).toBe("Bom");
        expect(item1.getCondition().comment).toBeUndefined();
        expect(item2.getCondition().status).toBe("Mau");
        expect(item2.getCondition().comment).toEqual("Gola rasgada");
    });
});

interface Options {
    generator?: Generator;
    itemStockRepository?: ItemStockRepository;
}

const makeService = (options?: Options) => {
    const storage = new InmemSequenceStorage();
    const sequenceGenerator = options?.generator ?? new SequenceGenerator(storage);
    const itemStockRepository = options?.itemStockRepository ?? new ItemStockRepositoryStub();
    const goodsReceiptNoteRepository = new InmemGoodsReceiptNoteRepository();
    const itemRepository = new ItemRepositoryStub();
    const service = new GoodsReceiptService(
        itemRepository,
        itemStockRepository,
        goodsReceiptNoteRepository,
        sequenceGenerator
    );

    return { service, goodsReceiptNoteRepository, itemRepository, itemStockRepository };
};
