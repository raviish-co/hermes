import { describe, expect, it } from "vitest";
import { ItemNotFound } from "../../domain/catalog/item_not_found_error";
import { ID } from "../../shared/id";
import { ItemRepositoryStub } from "../stubs/item_repository_stub";
import { SequenceGenerator } from "../../domain/sequences/sequence_generator";
import { InmemSequenceStorage } from "../../persistense/inmem/inmem_sequence_storage";
import { GoodsReceiptService } from "../../application/goods_receipt_service";
import { InmemGoodsReceiptNoteRepository } from "../../persistense/inmem/inmem_goods_receipt_note_repository";
import { InvalidEntryDate } from "../../domain/goods_receipt/invalid_entry_date_error";
import { InvalidLines } from "../../domain/goods_receipt/invalid_lines_error";
import type { Generator } from "../../domain/sequences/generator";

describe("Test Goods Receipt", () => {
    it("Deve retornar um erro **InvalidEntryDate** se a data de entrada de mercadoria não for definida", async () => {
        const { service } = makeService();

        const error = await service.new({ ...goodsReceiptData, entryDate: "" });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidEntryDate);
    });

    it("Deve retornar um erro **InvaldLines** se linhas estiver vazia", async () => {
        const { service } = makeService();

        const error = await service.new({ ...goodsReceiptData, lines: [] });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidLines);
    });

    it("Deve retornar um erro **ItemNotFound** se não existir", async () => {
        const { service } = makeService();

        const error = await service.new({
            ...goodsReceiptData,
            lines: [{ itemId: "123", quantity: 1 }],
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(ItemNotFound);
    });

    it("Deve retornar um error **InvalidLines** se não existir", async () => {
        const data = {
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };
        const { service } = makeService();

        const error = await service.new(data as any);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidLines);
    });

    it("Deve atualizar a quantidade em stock dos artigos", async () => {
        const { service, itemRepository } = makeService();

        await service.new(goodsReceiptData);

        const item1 = await itemRepository.getById(ID.fromString("1001"));
        const item2 = await itemRepository.getById(ID.fromString("1002"));

        expect(item1.getStock().quantity).toBe(11);
        expect(item2.getStock().quantity).toBe(11);
    });

    it("Deve efectuar a nota de entrada de mercadoria", async () => {
        const { service, goodsReceiptNoteRepository } = makeService();
        await service.new(goodsReceiptData);

        const goodsReceipt = await goodsReceiptNoteRepository.last();

        expect(goodsReceipt.goodsReceiptLines.length).toBe(2);
        expect(goodsReceipt.goodsReceiptLines[0].itemId.toString()).toBe("1001");
        expect(goodsReceipt.goodsReceiptLines[1].itemId.toString()).toBe("1002");
    });

    it("Deve gerar o ID para a nota de entrada de mercadoria", async () => {
        const THE_ID = "GS1001";
        const generator = {
            generate: () => THE_ID,
        };

        const { service, goodsReceiptNoteRepository } = makeService(generator);
        await service.new(goodsReceiptData);

        const goodsReceipt = await goodsReceiptNoteRepository.last();

        expect(goodsReceipt.goodsReceiptNoteId).toBeDefined();
        expect(goodsReceipt.goodsReceiptNoteId.toString()).toBe(THE_ID);
        expect(goodsReceipt.goodsReceiptNoteId).toBeInstanceOf(ID);
    });

    it("Deve atualizar a condição dos artigos", async () => {
        const lines = [
            { itemId: "1001", quantity: 2, condition: { status: "Bom" } },
            { itemId: "1002", quantity: 2, condition: { status: "Mau", comment: "Gola rasgada" } },
        ];
        const { service, itemRepository } = makeService();

        service.new({ ...goodsReceiptData, lines });

        const item1 = await itemRepository.getById(ID.fromString("1001"));
        const item2 = await itemRepository.getById(ID.fromString("1002"));

        expect(item1.getCondition().status).toBe("Bom");
        expect(item1.getCondition().comment).toBeUndefined();
        expect(item2.getCondition().status).toBe("Mau");
        expect(item2.getCondition().comment).toEqual("Gola rasgada");
    });
});

const makeService = (generator?: Generator) => {
    const storage = new InmemSequenceStorage();
    const sequenceGenerator = generator ?? new SequenceGenerator(storage);
    const goodsReceiptNoteRepository = new InmemGoodsReceiptNoteRepository();
    const itemRepository = new ItemRepositoryStub();
    const service = new GoodsReceiptService(
        itemRepository,
        goodsReceiptNoteRepository,
        sequenceGenerator
    );

    return { service, goodsReceiptNoteRepository, itemRepository };
};

const goodsReceiptData = {
    lines: [
        { itemId: "1001", quantity: 1 },
        { itemId: "1002", quantity: 1 },
    ],
    entryDate: "2024-03-01T16:40:00",
    userId: "1000",
};
