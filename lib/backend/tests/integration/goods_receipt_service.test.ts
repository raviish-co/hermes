import { describe, expect, it } from "vitest";
import type { Generator } from "../../adapters/sequences/generator";
import { SequenceGenerator } from "../../adapters/sequences/sequence_generator";
import { GoodsReceiptService } from "../../application/goods_receipt_service";
import { Item } from "../../domain/catalog/items/item";
import { ItemNotFound } from "../../domain/catalog/items/item_not_found_error";
import { InvalidEntryDate } from "../../domain/goods_receipt/invalid_entry_date_error";
import { InvalidLines } from "../../domain/goods_receipt/invalid_lines_error";
import type { ItemStockRepository } from "../../domain/warehouse/item_stock_repository";
import { InmemGoodsReceiptNoteRepository } from "../../persistence/inmem/inmem_goods_receipt_note_repository";
import { InmemItemRepository } from "../../persistence/inmem/inmem_item_repository";
import { InmemSequenceStorage } from "../../persistence/inmem/inmem_sequence_storage";
import { Decimal } from "../../shared/decimal";
import { ID } from "../../shared/id";
import { ItemRepositoryStub } from "../stubs/item_repository_stub";
import { ItemStockRepositoryStub } from "../stubs/item_stock_repository_stub";

describe("GoodsReceiptService - Entrada de mercadorias", () => {
    it("Deve retornar um erro **InvalidEntryDate** se a data de entrada de mercadoria não for definida", async () => {
        const data = {
            lines: [
                { itemId: "1001", goodQuantities: 5, consignmentPrice: 100 },
                { itemId: "1002", goodQuantities: 3, consignmentPrice: 100 },
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
            lines: [{ itemId: "123", goodQuantities: 1, consignmentPrice: 100 }],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const { service } = makeService();

        const error = await service.new(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(ItemNotFound);
    });

    it("Deve retornar um erro **InvalidLines** se não existirem linhas", async () => {
        const data = { entryDate: "2024-03-01T16:40:00", userId: "1000" };
        const { service } = makeService();

        const error = await service.new(data as any);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidLines);
    });

    it("Deve actualizar a quantidade em estoque dos artigos", async () => {
        const data = {
            lines: [
                { itemId: "1001", goodQuantities: 50, consignmentPrice: 100 },
                { itemId: "1002", goodQuantities: 20, consignmentPrice: 100 },
            ],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const { service, itemStockRepository } = makeService();

        await service.new(data);

        const itemIds = [ID.fromString("1001"), ID.fromString("1002")];
        const itemsStock = await itemStockRepository.findAll(itemIds);

        expect(itemsStock.length).toBe(2);
        expect(itemsStock[0].total).toBe(60);
        expect(itemsStock[1].total).toBe(30);
    });

    it("Se existir um conjunto de itens em mau estado, o seu número deve ser actualizado no stock", async () => {
        const data = {
            lines: [
                {
                    itemId: "1002",
                    goodQuantities: 50,
                    badQuantities: 10,
                    consignmentPrice: 100,
                },
                {
                    itemId: "1003",
                    goodQuantities: 20,
                    badQuantities: 15,
                    consignmentPrice: 100,
                },
            ],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const { service, itemStockRepository } = makeService();

        await service.new(data);

        const itemIds = [ID.fromString("1002"), ID.fromString("1003")];
        const itemsStock = await itemStockRepository.findAll(itemIds);

        expect(itemsStock.length).toBe(2);
        expect(itemsStock[0].badQuantities).toBe(10);
        expect(itemsStock[1].badQuantities).toBe(15);
    });

    it("Deve salva a guia de entrada de mercadoria no repositório", async () => {
        const data = {
            lines: [
                { itemId: "1001", goodQuantities: 50, consignmentPrice: 100 },
                { itemId: "1002", goodQuantities: 20, consignmentPrice: 100 },
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

    it("Deve registar na guia de entrada de mercadoria o número de itens em bom estado", async () => {
        const data = {
            lines: [
                { itemId: "1001", goodQuantities: 50, consignmentPrice: 100 },
                { itemId: "1002", goodQuantities: 20, consignmentPrice: 100 },
            ],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const { service, goodsReceiptNoteRepository } = makeService();
        await service.new(data);

        const note = await goodsReceiptNoteRepository.last();

        expect(note.lines[0].goodQuantities).toBe(50);
        expect(note.lines[1].goodQuantities).toBe(20);
    });

    it("Deve registar na guia de entrada de mercadoria o número de itens em mau estado", async () => {
        const data = {
            lines: [
                {
                    itemId: "1001",
                    goodQuantities: 50,
                    badQuantities: 15,
                    consignmentPrice: 100,
                },
                {
                    itemId: "1002",
                    goodQuantities: 20,
                    badQuantities: 15,
                    consignmentPrice: 100,
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
    });

    it("Deve gerar o ID para a nota de entrada de mercadoria", async () => {
        const THE_ID = "GS1001";
        const data = {
            lines: [{ itemId: "1001", goodQuantities: 50, consignmentPrice: 100 }],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const generator = { generate: async () => THE_ID };

        const { service, goodsReceiptNoteRepository } = makeService({ generator });

        await service.new(data);

        const note = await goodsReceiptNoteRepository.last();

        expect(note.noteId).toBeDefined();
        expect(note.noteId.toString()).toBe(THE_ID);
        expect(note.noteId).toBeInstanceOf(ID);
    });

    it("Deve registar a condição em que os artigos entraram em armazem", async () => {
        const data = {
            lines: [
                { itemId: "1001", goodQuantities: 2, consignmentPrice: 100 },
                {
                    itemId: "1002",
                    goodQuantities: 2,
                    consignmentPrice: 100,
                    comment: "Gola rasgada",
                },
            ],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const { service, goodsReceiptNoteRepository } = makeService();

        await service.new(data);

        const note = await goodsReceiptNoteRepository.last();

        expect(note.lines.length).toBe(2);

        expect(note.lines[0].condition.status).toBe("Bom");
        expect(note.lines[0].condition.comment).toBeUndefined();

        expect(note.lines[1].condition.status).toBe("Mau");
        expect(note.lines[1].condition.comment).toBe("Gola rasgada");
    });

    it("Deve criar os registos de stock, para os artigos que não tenham stock", async () => {
        const item = new Item(ID.fromString("2000"), "Camisa", new Decimal(1000));
        const item1 = new Item(ID.fromString("2001"), "Camisa", new Decimal(1000));
        const items = [item, item1];
        const itemRepository = new InmemItemRepository(items);
        const { service, itemStockRepository } = makeService({ itemRepository });

        await itemRepository.saveAll([item, item1]);

        const data = {
            lines: [
                { itemId: "2000", goodQuantities: 2, consignmentPrice: 100 },
                { itemId: "2001", goodQuantities: 2, consignmentPrice: 100 },
            ],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };

        await service.new(data);

        const itemIds = [ID.fromString("2000"), ID.fromString("2000")];
        const itemsStock = await itemStockRepository.findAll(itemIds);

        expect(itemsStock.length).toBe(2);
        expect(itemsStock[0].total).toBe(2);
        expect(itemsStock[1].total).toBe(2);
    });

    it("Deve actualizar as quantidades de stock, para os artigos que já tenham stock", async () => {
        const { service, itemStockRepository } = makeService();

        const data = {
            lines: [
                { itemId: "1001", goodQuantities: 2, consignmentPrice: 100 },
                { itemId: "1002", goodQuantities: 2, consignmentPrice: 300 },
            ],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };

        await service.new(data);

        const itemIds = [ID.fromString("1001"), ID.fromString("1002")];
        const itemsStock = await itemStockRepository.findAll(itemIds);

        expect(itemsStock.length).toBe(2);
        expect(itemsStock[0].total).toBe(12);
        expect(itemsStock[1].total).toBe(12);
    });

    it("Deve registar na guia de entrada o preço de consignação dos artigos", async () => {
        const { service, goodsReceiptNoteRepository } = makeService();

        const data = {
            lines: [
                { itemId: "1001", goodQuantities: 2, consignmentPrice: 100 },
                { itemId: "1002", goodQuantities: 3, consignmentPrice: 200 },
            ],
            entryDate: "2025-09-01T11:00:00",
            userId: "1000",
        };

        await service.new(data);

        const note = await goodsReceiptNoteRepository.last();

        expect(note.lines.length).toBe(2);
        expect(note.lines[0].consignmentPrice).toBe(100);
        expect(note.lines[1].consignmentPrice).toBe(200);
    });

    it("Deve registar na guia de entrada o status 'Consignação' nos artigos por 'default'", async () => {
        const { service, goodsReceiptNoteRepository } = makeService();

        const data = {
            lines: [
                {
                    itemId: "1001",
                    goodQuantities: 2,
                    consignmentPrice: 100,
                },
                {
                    itemId: "1002",
                    goodQuantities: 3,
                    consignmentPrice: 200,
                },
            ],
            entryDate: "2025-09-01T11:00:00",
            userId: "1000",
        };

        await service.new(data);

        const note = await goodsReceiptNoteRepository.last();

        expect(note.lines.length).toBe(2);
        expect(note.lines[0].itemStatus).toBe("Consignação");
        expect(note.lines[1].itemStatus).toBe("Consignação");
    });

    it("Deve registar no stock os items com o status 'Consignação'", async () => {
        const { service, itemStockRepository } = makeService();

        const data = {
            lines: [
                {
                    itemId: "1001",
                    goodQuantities: 2,
                    consignmentPrice: 100,
                },
                {
                    itemId: "1002",
                    goodQuantities: 3,
                    consignmentPrice: 200,
                },
            ],
            entryDate: "2025-09-01T11:00:00",
            userId: "1000",
        };

        await service.new(data);

        const itemsIds = [ID.fromString("1001"), ID.fromString("1002")];
        const itemsStock = await itemStockRepository.findAll(itemsIds);

        expect(itemsStock.length).toBe(2);
        expect(itemsStock[0].status).toBe("Consignação");
        expect(itemsStock[1].status).toBe("Consignação");
    });
});

describe("GoodsReceiptService - Listar guias de entrada de mercadoria", () => {
    it("Deve listar todas as guias de entrada de mercadoria", async () => {
        const { service } = makeService();
        const data = {
            lines: [
                { itemId: "1001", goodQuantities: 2, consignmentPrice: 100 },
                { itemId: "1002", goodQuantities: 2, consignmentPrice: 100 },
            ],
            entryDate: "2024-03-01T16:40:00",
            userId: "1001",
        };

        await service.new(data);

        const notes = await service.list();

        expect(notes.length).toBe(1);
    });

    it("Deve retornar uma lista vazia se não houver guias de entrada de mercadoria", async () => {
        const { service } = makeService();

        const notes = await service.list();

        expect(notes.length).toBe(0);
    });
});

interface Options {
    generator?: Generator;
    itemStockRepository?: ItemStockRepository;
    itemRepository?: InmemItemRepository;
}

const makeService = (options?: Options) => {
    const storage = new InmemSequenceStorage();
    const sequenceGenerator = options?.generator ?? new SequenceGenerator(storage);
    const itemStockRepository = options?.itemStockRepository ?? new ItemStockRepositoryStub();
    const goodsReceiptNoteRepository = new InmemGoodsReceiptNoteRepository();
    const itemRepository = options?.itemRepository ?? new ItemRepositoryStub();
    const service = new GoodsReceiptService(
        itemRepository,
        itemStockRepository,
        goodsReceiptNoteRepository,
        sequenceGenerator
    );

    return { service, goodsReceiptNoteRepository, itemRepository, itemStockRepository };
};
