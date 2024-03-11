import { InvalidGoodsIssueLineQuantity } from "../../domain/goods_issue/invalid_goods_issue_line_quantity_error";
import { InmemGoodsReturnNoteRepository } from "../../persistense/inmem/inmem_goods_return_note_repository";
import { GoodsIssueNoteNotFound } from "../../domain/goods_issue/goods_issue_note_not_found_error";
import { InmemSequenceStorage } from "../../persistense/inmem/inmem_sequence_storage";
import type { GoodsIssueNote } from "../../domain/goods_issue/goods_issue_note";
import { GoodsIssueRepositoryStub } from "../stubs/goods_issue_repository_stub";
import { SequenceGenerator } from "../../domain/sequences/sequence_generator";
import { GoodsReturnService } from "../../application/goods_return_service";
import { ItemRepositoryStub } from "../stubs/item_repository_stub";
import { describe, expect, it } from "vitest";
import { ID } from "../../shared/id";
import { InmemItemRepository } from "../../persistense/inmem/inmem_item_repository";
import { Item, Status } from "../../domain/catalog/item";
import { ItemStock } from "../../domain/catalog/item_stock";
import { Decimal } from "../../shared/decimal";

describe("GoodsReturnService - Devolução total", () => {
    it("Deve efetuar a devolução de um conjunto de artigos", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemRepository = new ItemRepositoryStub();
        const goodsIssueRepository = new GoodsIssueRepositoryStub();
        const goodsReturnRepository = new InmemGoodsReturnNoteRepository();
        const sequenceStorage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(sequenceStorage, 1000);

        const service = new GoodsReturnService(
            goodsReturnRepository,
            goodsIssueRepository,
            itemRepository,
            sequenceGenerator
        );

        await service.returningGoods(goodsIssueNoteId, securityDepositToBeRetained, itemsData);

        const note = await goodsReturnRepository.last();

        expect(note.goodsReturnsNoteId).toBeDefined();
        expect(note.goodsIssueNoteId.toString()).toBe(goodsIssueNoteId);
    });

    it("Deve retornar o erro **GoodsIssueNoteNotFound** se a nota de saída não for encontrada", async () => {
        const goodsIssueNoteId = "GS - 0001";
        const goodsIssueRepository = new GoodsIssueRepositoryStub();
        const goodsReturnRepository = new InmemGoodsReturnNoteRepository();
        const itemRepository = new ItemRepositoryStub();
        const sequenceStorage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(sequenceStorage, 1000);

        const service = new GoodsReturnService(
            goodsReturnRepository,
            goodsIssueRepository,
            itemRepository,
            sequenceGenerator
        );

        const error = await service.returningGoods(
            goodsIssueNoteId,
            securityDepositToBeRetained,
            itemsData
        );

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(GoodsIssueNoteNotFound);
    });

    it("Deve registrar o valor da calção a reter na nota de devolução", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const goodsReturnRepository = new InmemGoodsReturnNoteRepository();
        const goodsIssueRepository = new GoodsIssueRepositoryStub();
        const itemRepository = new ItemRepositoryStub();

        const sequenceStorage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(sequenceStorage, 1000);

        const service = new GoodsReturnService(
            goodsReturnRepository,
            goodsIssueRepository,
            itemRepository,
            sequenceGenerator
        );

        await service.returningGoods(goodsIssueNoteId, securityDepositToBeRetained, itemsData);

        const note = await goodsReturnRepository.last();

        expect(note.securityDepositToBeRetained.value).toBe(securityDepositToBeRetained);
    });

    it("Deve actualizar o stock dos artigos devolvidos", async () => {
        const goodsIssueNoteId = "GS - 1002";
        const itemRepository = new ItemRepositoryStub();
        const goodsIssueRepository = new GoodsIssueRepositoryStub();
        const goodsReturnRepository = new InmemGoodsReturnNoteRepository();
        const sequenceStorage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(sequenceStorage, 1000);

        const itemsData = [
            { itemId: "1004", quantity: 3, comment: "Riscado" },
            { itemId: "1005", quantity: 2 },
        ];

        const service = new GoodsReturnService(
            goodsReturnRepository,
            goodsIssueRepository,
            itemRepository,
            sequenceGenerator
        );

        await service.returningGoods(goodsIssueNoteId, securityDepositToBeRetained, itemsData);

        const item = await itemRepository.getById(ID.fromString("1004"));

        expect(item.getStock().quantity).toBe(10);
    });

    it("Deve mudar o estado da guida de saída para devolvido", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemRepository = new ItemRepositoryStub();
        const goodsIssueRepository = new GoodsIssueRepositoryStub();
        const goodsReturnRepository = new InmemGoodsReturnNoteRepository();
        const sequenceStorage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(sequenceStorage, 1000);

        const service = new GoodsReturnService(
            goodsReturnRepository,
            goodsIssueRepository,
            itemRepository,
            sequenceGenerator
        );

        await service.returningGoods(goodsIssueNoteId, securityDepositToBeRetained, itemsData);

        const noteOrErr = await goodsIssueRepository.getById(ID.fromString(goodsIssueNoteId));

        const note = <GoodsIssueNote>noteOrErr.value;

        expect(note.isReturned()).toBeTruthy();
    });

    it("Deve criar o identificador da nota de devolução", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemRepository = new ItemRepositoryStub();
        const goodsIssueRepository = new GoodsIssueRepositoryStub();
        const goodsReturnRepository = new InmemGoodsReturnNoteRepository();
        const sequenceStorage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(sequenceStorage, 1000);

        const service = new GoodsReturnService(
            goodsReturnRepository,
            goodsIssueRepository,
            itemRepository,
            sequenceGenerator
        );

        await service.returningGoods(goodsIssueNoteId, securityDepositToBeRetained, itemsData);

        const note = await goodsReturnRepository.last();

        expect(note.goodsReturnsNoteId.toString()).toBe("GD - 1000");
    });

    it("Deve retornar **InvalidQuantity** se a quantidade devolvida do item for diferente da quantidade na guida de sáida", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1001", quantity: 3 },
            { itemId: "1002", quantity: 3 },
        ];

        const itemRepository = new ItemRepositoryStub();
        const goodsIssueRepository = new GoodsIssueRepositoryStub();
        const goodsReturnRepository = new InmemGoodsReturnNoteRepository();
        const sequenceStorage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(sequenceStorage, 1000);

        const service = new GoodsReturnService(
            goodsReturnRepository,
            goodsIssueRepository,
            itemRepository,
            sequenceGenerator
        );

        const error = await service.returningGoods(
            goodsIssueNoteId,
            securityDepositToBeRetained,
            itemsData
        );

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidGoodsIssueLineQuantity);
    });

    it("Deve actualizar a condição dos artigos devolvidos", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemRepository = new ItemRepositoryStub();
        const goodsIssueRepository = new GoodsIssueRepositoryStub();
        const goodsReturnRepository = new InmemGoodsReturnNoteRepository();
        const sequenceStorage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(sequenceStorage, 1000);

        const service = new GoodsReturnService(
            goodsReturnRepository,
            goodsIssueRepository,
            itemRepository,
            sequenceGenerator
        );

        await service.returningGoods(goodsIssueNoteId, securityDepositToBeRetained, itemsData);

        const item = await itemRepository.getById(ID.fromString("1001"));

        expect(item.getCondition().comment).toBe("Riscado");
    });
});

describe("GoodsReturnService - Devolução parcial", () => {
    it("Deve efectuar a devolução parcial de um conjunto de artigos", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemRepository = new ItemRepositoryStub();
        const goodsIssueRepository = new GoodsIssueRepositoryStub();
        const goodsReturnRepository = new InmemGoodsReturnNoteRepository();
        const sequenceStorage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(sequenceStorage, 1000);

        const service = new GoodsReturnService(
            goodsReturnRepository,
            goodsIssueRepository,
            itemRepository,
            sequenceGenerator
        );

        await service.returningGoods(
            goodsIssueNoteId,
            securityDepositToBeRetained,
            itemsPartialData
        );

        const note = await goodsReturnRepository.last();

        expect(note.goodsReturnsNoteId).toBeDefined();
        expect(note.goodsReturnsNoteId.toString()).toBe("GD - 1000");
        expect(note.goodsIssueNoteId.toString()).toBe(goodsIssueNoteId);
    });

    it("Deve guardar a quantidade devolvida do artigo na nota de devolução", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemRepository = new ItemRepositoryStub();
        const goodsIssueRepository = new GoodsIssueRepositoryStub();
        const goodsReturnRepository = new InmemGoodsReturnNoteRepository();
        const sequenceStorage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(sequenceStorage, 1000);

        const service = new GoodsReturnService(
            goodsReturnRepository,
            goodsIssueRepository,
            itemRepository,
            sequenceGenerator
        );

        await service.returningGoods(
            goodsIssueNoteId,
            securityDepositToBeRetained,
            itemsPartialData
        );

        const note = await goodsReturnRepository.last();

        expect(note.goodsReturnLines[0].quantity).toBe(1);
    });

    it("Deve actualizar o stock do artigo que foi devolvido parcialmente", async () => {
        const goodsIssueNoteId = "GS - 1003";
        const itemRepository = new ItemRepositoryStub();
        const goodsIssueRepository = new GoodsIssueRepositoryStub();
        const goodsReturnRepository = new InmemGoodsReturnNoteRepository();
        const sequenceStorage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(sequenceStorage, 1000);

        const service = new GoodsReturnService(
            goodsReturnRepository,
            goodsIssueRepository,
            itemRepository,
            sequenceGenerator
        );

        await service.returningGoods(
            goodsIssueNoteId,
            securityDepositToBeRetained,
            itemsPartialData1
        );

        const item = await itemRepository.getById(ID.fromString("1006"));

        expect(item.getStock().quantity).toBe(9);
    });
});

const securityDepositToBeRetained = "100,00";
const itemsData = [
    { itemId: "1001", quantity: 3, comment: "Riscado" },
    { itemId: "1002", quantity: 2 },
];
const itemsPartialData = [{ itemId: "1001", quantity: 1, comment: "Riscado" }];
const itemsPartialData1 = [{ itemId: "1006", quantity: 1, comment: "Rasgado" }];
