import { describe, expect, it } from "vitest";
import { ItemStockRepositoryStub } from "../stubs/item_stock_repository_stub";
import { ID } from "../../shared/id";
import { GoodsReceiptItemStockService } from "../../application/goods_receipt_item_stock_service";
import { InmemGoodsReceiptNoteRepository } from "../../persistence/inmem/inmem_goods_receipt_note_repository";
import { DefaultPurposeSpecification } from "../../adapters/default_purpose_specification";
import { ItemRepositoryStub } from "../stubs/item_repository_stub";
import { InmemGoodsIssueNoteRepository } from "../../persistence/inmem/inmem_goods_issue_note_repository";
import { InmemSequenceStorage } from "../../persistence/inmem/inmem_sequence_storage";
import { SequenceGenerator } from "../../adapters/sequences/sequence_generator";
import { GoodsIssueService } from "../../application/goods_issue_service";
import type { ItemStockRepository } from "../../domain/warehouse/item_stock_repository";
import { GoodsReceiptService } from "../../application/goods_receipt_service";
import type { GoodsReceiptNoteRepository } from "../../domain/goods_receipt/goods_receipt_note_repository";
import { ItemStockNotFound } from "../../domain/warehouse/item_stock_not_found";
import { GoodsReceiptNoteNotFoundError } from "../../domain/goods_receipt/goods_receipt_note_not_found_error";

describe("GoodsReceiptItemStockService", () => {
    it("Deve atualizar o estado do **itemStock** no repositório", async () => {
        const itemStockRepository = new ItemStockRepositoryStub();
        const noteRepository = new InmemGoodsReceiptNoteRepository();

        await makeGoodsReceiptService(itemStockRepository, noteRepository);
        await makeGoodsIssueService(itemStockRepository);

        const service = new GoodsReceiptItemStockService(noteRepository, itemStockRepository);
        const noteId = (await noteRepository.last()).noteId;

        const voidOrErr = await service.updateItemStockStatus("1001", noteId.toString());
        expect(voidOrErr.isRight()).toBeTruthy();

        const itemStockOrErr = await itemStockRepository.getById(ID.fromString("1001"));

        expect(itemStockOrErr.isRight()).toBeTruthy();
        expect(itemStockOrErr.value.status).toBe("Interno");
    });

    it("Deve retornar erro se o item não for encontrado no repositório", async () => {
        const itemStockRepository = new ItemStockRepositoryStub();
        const noteRepository = new InmemGoodsReceiptNoteRepository();

        const service = new GoodsReceiptItemStockService(noteRepository, itemStockRepository);

        const voidOrErr = await service.updateItemStockStatus("invalid-item-id", "GE - 1000");
        expect(voidOrErr.isLeft()).toBeTruthy();
        expect(voidOrErr.value).toBeInstanceOf(ItemStockNotFound);
    });

    it("Deve retornar erro se a guia de entrada de mercadoria não for encontrada no repositório", async () => {
        const itemStockRepository = new ItemStockRepositoryStub();
        const noteRepository = new InmemGoodsReceiptNoteRepository();

        await makeGoodsReceiptService(itemStockRepository, noteRepository);
        await makeGoodsIssueService(itemStockRepository);

        const service = new GoodsReceiptItemStockService(noteRepository, itemStockRepository);

        const voidOrErr = await service.updateItemStockStatus("1001", "invalid-note-id");
        expect(voidOrErr.isLeft()).toBeTruthy();
        expect(voidOrErr.value).toBeInstanceOf(GoodsReceiptNoteNotFoundError);
    });
});

async function makeGoodsIssueService(itemStockRepo?: ItemStockRepository) {
    const purposeSource = new DefaultPurposeSpecification();
    const itemRepository = new ItemRepositoryStub();
    const noteRepository = new InmemGoodsIssueNoteRepository();
    const storage = new InmemSequenceStorage();
    const generator = new SequenceGenerator(storage, 1000);
    const itemStockRepository = itemStockRepo ? itemStockRepo : new ItemStockRepositoryStub();
    const service = new GoodsIssueService(
        itemRepository,
        itemStockRepository,
        noteRepository,
        generator,
        purposeSource
    );

    const goodsIssueData = {
        purpose: {
            description: "Lavandaria",
            details: "Interna",
            notes: "Nome",
        },
        lines: [
            {
                itemId: "1001",
                goodQuantities: 2,
            },
            {
                itemId: "1002",
                goodQuantities: 3,
            },
        ],
        total: 55500,
        returnDate: "2021-01-01T16:40:00",
        userId: "1000",
    };

    await service.new(goodsIssueData);
    await service.new(goodsIssueData);
}

const makeGoodsReceiptService = async (
    itemStockRepo?: ItemStockRepository,
    noteRepository?: GoodsReceiptNoteRepository
) => {
    const storage = new InmemSequenceStorage();
    const sequenceGenerator = new SequenceGenerator(storage);
    const itemStockRepository = itemStockRepo ? itemStockRepo : new ItemStockRepositoryStub();
    const goodsReceiptNoteRepository = noteRepository
        ? noteRepository
        : new InmemGoodsReceiptNoteRepository();
    const itemRepository = new ItemRepositoryStub();
    const service = new GoodsReceiptService(
        itemRepository,
        itemStockRepository,
        goodsReceiptNoteRepository,
        sequenceGenerator
    );

    const data = {
        lines: [
            { itemId: "1001", goodQuantities: 2, consignmentPrice: 200 },
            { itemId: "1002", goodQuantities: 2, consignmentPrice: 100 },
        ],
        entryDate: "2024-03-01T16:40:00",
        userId: "1001",
    };

    await service.new(data);

    return { goodsReceiptNoteRepository, itemStockRepository };
};
