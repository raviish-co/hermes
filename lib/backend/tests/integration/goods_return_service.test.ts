import { InvalidGoodsIssueLineQuantity } from "../../domain/goods_issue/invalid_goods_issue_line_quantity_error";
import { InmemGoodsReturnNoteRepository } from "../../persistense/inmem/inmem_goods_return_note_repository";
import { GoodsIssueLineNotFound } from "../../domain/goods_issue/goods_lssue_line_not_found_error";
import { GoodsIssueNoteNotFound } from "../../domain/goods_issue/goods_issue_note_not_found_error";
import { InmemSequenceStorage } from "../../persistense/inmem/inmem_sequence_storage";
import type { GoodsIssueNote } from "../../domain/goods_issue/goods_issue_note";
import { GoodsIssueRepositoryStub } from "../stubs/goods_issue_repository_stub";
import { SequenceGenerator } from "../../domain/sequences/sequence_generator";
import { GoodsReturnService } from "../../application/goods_return_service";
import { ItemRepositoryStub } from "../stubs/item_repository_stub";
import { describe, expect, it } from "vitest";
import { ID } from "../../shared/id";

describe("GoodsReturnService - Devolução dos artigos", () => {
    it("Deve efetuar a devolução de um conjunto de artigos", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1001", quantity: 1, comment: "Riscado" },
            { itemId: "1002", quantity: 1 },
        ];
        const { service, goodsReturnNoteRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, depositWithheld, itemsData);

        const note = await goodsReturnNoteRepository.getById(ID.fromString("GD - 1001"));

        expect(note.goodsReturnLines.length).toBe(2);
    });

    it("Deve devolver as quantidades exactas dos artigos solicitados na guia de saída de mercadoria", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1001", quantity: 1, comment: "Riscado" },
            { itemId: "1002", quantity: 1 },
        ];
        const { service, goodsReturnNoteRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, depositWithheld, itemsData);

        const note = await goodsReturnNoteRepository.getById(ID.fromString("GD - 1001"));

        expect(note.goodsReturnLines[0].quantityReturned).toBe(1);
        expect(note.goodsReturnLines[1].quantityReturned).toBe(1);
    });

    it("Deve armazenar os IDs dos artigos devolvidos nas devolução", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1001", quantity: 1, comment: "Riscado" },
            { itemId: "1002", quantity: 1 },
        ];
        const { service, goodsReturnNoteRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, depositWithheld, itemsData);

        const note = await goodsReturnNoteRepository.getById(ID.fromString("GD - 1001"));

        expect(note.goodsReturnLines[0].itemId.toString()).toBe("1001");
        expect(note.goodsReturnLines[1].itemId.toString()).toBe("1002");
    });

    it("Deve retornar o erro **GoodsIssueNoteNotFound** se a nota de saída não for encontrada", async () => {
        const goodsIssueNoteId = "GS - 0001";
        const { service } = makeService();

        const error = await service.returningGoods(goodsIssueNoteId, depositWithheld, itemsData);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(GoodsIssueNoteNotFound);
    });

    it("Deve registrar o valor da calção retida na nota de devolução", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1001", quantity: 1, comment: "Riscado" },
            { itemId: "1002", quantity: 1 },
        ];
        const { service, goodsReturnNoteRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, depositWithheld, itemsData);

        const note = await goodsReturnNoteRepository.getById(ID.fromString("GD - 1001"));

        expect(note.securityDepositWithheld.value).toEqual(depositWithheld);
    });

    it("Deve actualizar o stock dos artigos devolvidos", async () => {
        const goodsIssueNoteId = "GS - 1002";
        const itemsData = [
            { itemId: "1004", quantity: 1, comment: "Riscado" },
            { itemId: "1005", quantity: 1 },
        ];
        const { service, itemRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, depositWithheld, itemsData);

        const item = await itemRepository.getById(ID.fromString("1004"));
        const item2 = await itemRepository.getById(ID.fromString("1005"));

        expect(item.getStock().quantity).toBe(8);
        expect(item2.getStock().quantity).toBe(9);
    });

    it("Deve definir a guida de saída de artigos como devolvida", async () => {
        const goodsIssueNoteId = "GS - 1002";
        const itemsData = [
            { itemId: "1004", quantity: 2, comment: "Riscado" },
            { itemId: "1005", quantity: 1 },
        ];
        const { service, goodsIssueRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, depositWithheld, itemsData);

        const noteOrErr = await goodsIssueRepository.getById(ID.fromString(goodsIssueNoteId));

        const note = <GoodsIssueNote>noteOrErr.value;

        expect(note.isReturned()).toBeTruthy();
    });

    it("Deve retornar **InvalidQuantity** se a quantidade devolvida do item for diferente da quantidade na guida de saída", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1001", quantity: 100 },
            { itemId: "1002", quantity: 3 },
        ];
        const { service } = makeService();

        const error = await service.returningGoods(goodsIssueNoteId, depositWithheld, itemsData);

        expect(error.isLeft()).toBeTruthy();

        expect(error.value).toBeInstanceOf(InvalidGoodsIssueLineQuantity);
    });

    it("Deve actualizar a condição dos artigos devolvidos", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1001", quantity: 1, comment: "Riscado" },
            { itemId: "1002", quantity: 1 },
        ];
        const { service, itemRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, depositWithheld, itemsData);

        const item = await itemRepository.getById(ID.fromString("1001"));

        expect(item.getCondition().comment).toBe("Riscado");
    });

    it("Deve retornar o erro **GoodsIssueLineNotFound** se a linha com base no ID do artigo não for encontrada", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1007", quantity: 3 },
            { itemId: "1002", quantity: 3 },
        ];
        const { service } = makeService();

        const error = await service.returningGoods(goodsIssueNoteId, depositWithheld, itemsData);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(GoodsIssueLineNotFound);
    });

    it("Deve fechar a guida de saída de mercadoria se todos os artigos foram devolvidos", async () => {
        const goodsIssueNoteId = "GS - 1003";
        const itemsData = [{ itemId: "1006", quantity: 2, comment: "Rasgado" }];
        const { service, goodsIssueRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, depositWithheld, itemsData);

        const noteOrErr = await goodsIssueRepository.getById(ID.fromString(goodsIssueNoteId));

        const note = <GoodsIssueNote>noteOrErr.value;

        expect(note.isReturned()).toBeTruthy();
    });

    it("Deve registrar a devolução dos artigos no repositório", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1001", quantity: 1, comment: "Riscado" },
            { itemId: "1002", quantity: 1 },
        ];
        const { service, goodsReturnNoteRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, depositWithheld, itemsData);

        const note = await goodsReturnNoteRepository.getById(ID.fromString("GD - 1001"));

        expect(note.goodsReturnNoteId.toString()).toBe("GD - 1001");
    });

    it("Deve referenciar a guida de saída de mercadoria no documento de devolução", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1001", quantity: 1, comment: "Riscado" },
            { itemId: "1002", quantity: 1 },
        ];
        const { service, goodsReturnNoteRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, depositWithheld, itemsData);

        const note = await goodsReturnNoteRepository.getById(ID.fromString("GD - 1001"));

        expect(note.goodsIssueNoteId.toString()).toBe("GS - 1000");
    });

    it("Deve adicionar as linhas de devolução no documento de devolução", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1001", quantity: 1, comment: "Riscado" },
            { itemId: "1002", quantity: 1 },
        ];
        const { service, goodsReturnNoteRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, depositWithheld, itemsData);

        const note = await goodsReturnNoteRepository.getById(ID.fromString("GD - 1001"));

        expect(note.goodsReturnLines.length).toBe(2);
    });

    it("Deve registrar o memento em que a devolução foi efectuada", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1001", quantity: 1, comment: "Riscado" },
            { itemId: "1002", quantity: 1 },
        ];
        const { service, goodsReturnNoteRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, depositWithheld, itemsData);

        const note = await goodsReturnNoteRepository.getById(ID.fromString("GD - 1001"));

        expect(note.issuedAt.getTime()).toBeLessThanOrEqual(new Date().getTime());
    });

    it("Deve registrar o identificador do documento de devolução", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1001", quantity: 1, comment: "Riscado" },
            { itemId: "1002", quantity: 1 },
        ];
        const { service, goodsReturnNoteRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, depositWithheld, itemsData);

        const note = await goodsReturnNoteRepository.getById(ID.fromString("GD - 1001"));

        expect(note.goodsReturnNoteId.toString()).toBe("GD - 1001");
    });

    it("Deve retornar o erro **GoodsIssueNoteHasBenReturned** se a guia de saída de mercadoria já foi devolvida por completo", async () => {
        const goodsIssueNoteId = "GS - 1003";
        const itemsData = [{ itemId: "1006", quantity: 2, comment: "Riscado" }];

        const { service } = makeService();

        await service.returningGoods(goodsIssueNoteId, depositWithheld, itemsData);

        const error = await service.returningGoods(goodsIssueNoteId, depositWithheld, itemsData);

        expect(error.isLeft()).toBeTruthy();
    });

    it("Deve verificar se as quantidades devolvidas estão no intervalo das quantidades solicitas e as quantidades devolvidas", async () => {
        const goodsIssueNoteId = "GS - 1004";
        const itemsData = [{ itemId: "1007", quantity: 1 }];
        const itemsData1 = [{ itemId: "1007", quantity: 3 }];

        const { service } = makeService();

        await service.returningGoods(goodsIssueNoteId, depositWithheld, itemsData);

        const error = await service.returningGoods(goodsIssueNoteId, depositWithheld, itemsData1);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidGoodsIssueLineQuantity);
    });
});

const depositWithheld = "100,00";
const itemsData = [
    { itemId: "1001", quantity: 3, comment: "Riscado" },
    { itemId: "1002", quantity: 2 },
];

function makeService() {
    const storage = new InmemSequenceStorage();
    const generator = new SequenceGenerator(storage, 1001);
    const itemRepository = new ItemRepositoryStub();
    const goodsIssueRepository = new GoodsIssueRepositoryStub();
    const goodsReturnNoteRepository = new InmemGoodsReturnNoteRepository();

    const service = new GoodsReturnService(
        goodsIssueRepository,
        itemRepository,
        goodsReturnNoteRepository,
        generator
    );

    return { service, itemRepository, goodsIssueRepository, goodsReturnNoteRepository };
}
