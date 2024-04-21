import { describe, expect, it } from "vitest";
import { SequenceGenerator } from "../../adapters/sequences/sequence_generator";
import { GoodsReturnService } from "../../application/goods_return_service";
import type { Item } from "../../domain/catalog/items/item";
import type { GoodsIssueNote } from "../../domain/goods_issue/goods_issue_note";
import { GoodsIssueNoteNotFound } from "../../domain/goods_issue/goods_issue_note_not_found_error";
import { GoodsIssueLineNotFound } from "../../domain/goods_issue/goods_lssue_line_not_found_error";
import { InvalidGoodsIssueLineQuantity } from "../../domain/goods_issue/invalid_goods_issue_line_quantity_error";
import type { GoodsReturnNote } from "../../domain/goods_return/goods_return_note";
import { GoodsReturnNoteNotFound } from "../../domain/goods_return/goods_return_note_not_found_error";
import { InmemGoodsReturnNoteRepository } from "../../persistense/inmem/inmem_goods_return_note_repository";
import { InmemSequenceStorage } from "../../persistense/inmem/inmem_sequence_storage";
import { ID } from "../../shared/id";
import { GoodsIssueRepositoryStub } from "../stubs/goods_issue_repository_stub";
import { ItemRepositoryStub } from "../stubs/item_repository_stub";

describe("GoodsReturnService - Devolução dos artigos", () => {
    it("Deve efetuar a devolução de um conjunto de artigos", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1001", quantity: 1, comment: "Riscado" },
            { itemId: "1002", quantity: 1 },
        ];
        const { service, goodsReturnNoteRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, securityDepositWithHeld, itemsData);

        const noteOrErr = await goodsReturnNoteRepository.getById(ID.fromString("GD - 1001"));
        const note = <GoodsReturnNote>noteOrErr.value;

        expect(note.goodsReturnLines.length).toBe(2);
    });

    it("Deve devolver as quantidades exactas dos artigos solicitados na guia de saída de mercadoria", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1001", quantity: 1, comment: "Riscado" },
            { itemId: "1002", quantity: 1 },
        ];
        const { service, goodsReturnNoteRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, securityDepositWithHeld, itemsData);

        const noteOrErr = await goodsReturnNoteRepository.getById(ID.fromString("GD - 1001"));
        const note = <GoodsReturnNote>noteOrErr.value;

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

        await service.returningGoods(goodsIssueNoteId, securityDepositWithHeld, itemsData);

        const noteOrErr = await goodsReturnNoteRepository.getById(ID.fromString("GD - 1001"));
        const note = <GoodsReturnNote>noteOrErr.value;

        expect(note.goodsReturnLines[0].itemId.toString()).toBe("1001");
        expect(note.goodsReturnLines[1].itemId.toString()).toBe("1002");
    });

    it("Deve retornar o erro **GoodsIssueNoteNotFound** se a guia de saída não for encontrada", async () => {
        const goodsIssueNoteId = "GS - 0001";
        const { service } = makeService();

        const error = await service.returningGoods(
            goodsIssueNoteId,
            securityDepositWithHeld,
            itemsData
        );

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(GoodsIssueNoteNotFound);
    });

    it("Deve registrar o valor da calção retida na guia de devolução", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1001", quantity: 1, comment: "Riscado" },
            { itemId: "1002", quantity: 1 },
        ];
        const { service, goodsReturnNoteRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, securityDepositWithHeld, itemsData);

        const noteOrErr = await goodsReturnNoteRepository.getById(ID.fromString("GD - 1001"));
        const note = <GoodsReturnNote>noteOrErr.value;

        expect(note.securityDepositWithheld.value).toEqual(securityDepositWithHeld);
    });

    it("Deve actualizar o stock dos artigos devolvidos", async () => {
        const goodsIssueNoteId = "GS - 1002";
        const itemsData = [
            { itemId: "1004", quantity: 1, comment: "Riscado" },
            { itemId: "1005", quantity: 1 },
        ];
        const { service, itemRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, securityDepositWithHeld, itemsData);

        const itemOrErr = await itemRepository.getById(ID.fromString("1004"));
        const item2OrErr = await itemRepository.getById(ID.fromString("1005"));

        const item = <Item>itemOrErr.value;
        const item2 = <Item>item2OrErr.value;

        expect(item.stock.quantity).toBe(8);
        expect(item2.stock.quantity).toBe(9);
    });

    it("Deve definir a guida de saída de artigos como devolvida", async () => {
        const goodsIssueNoteId = "GS - 1002";
        const itemsData = [
            { itemId: "1004", quantity: 2, comment: "Riscado" },
            { itemId: "1005", quantity: 1 },
        ];
        const { service, goodsIssueRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, securityDepositWithHeld, itemsData);

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

        const error = await service.returningGoods(
            goodsIssueNoteId,
            securityDepositWithHeld,
            itemsData
        );

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

        await service.returningGoods(goodsIssueNoteId, securityDepositWithHeld, itemsData);

        const itemOrErr = await itemRepository.getById(ID.fromString("1001"));

        const item = <Item>itemOrErr.value;

        expect(item.getCondition().comment).toBe("Riscado");
    });

    it("Deve retornar o erro **GoodsIssueLineNotFound** se a linha com base no ID do artigo não for encontrada", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1007", quantity: 3 },
            { itemId: "1002", quantity: 3 },
        ];
        const { service } = makeService();

        const error = await service.returningGoods(
            goodsIssueNoteId,
            securityDepositWithHeld,
            itemsData
        );

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(GoodsIssueLineNotFound);
    });

    it("Deve fechar a guida de saída de mercadoria se todos os artigos foram devolvidos", async () => {
        const goodsIssueNoteId = "GS - 1003";
        const itemsData = [{ itemId: "1006", quantity: 2, comment: "Rasgado" }];
        const { service, goodsIssueRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, securityDepositWithHeld, itemsData);

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

        await service.returningGoods(goodsIssueNoteId, securityDepositWithHeld, itemsData);

        const noteOrErr = await goodsReturnNoteRepository.getById(ID.fromString("GD - 1001"));
        const note = <GoodsReturnNote>noteOrErr.value;

        expect(note.goodsReturnNoteId.toString()).toBe("GD - 1001");
    });

    it("Deve referenciar a guida de saída de mercadoria no documento de devolução", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1001", quantity: 1, comment: "Riscado" },
            { itemId: "1002", quantity: 1 },
        ];
        const { service, goodsReturnNoteRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, securityDepositWithHeld, itemsData);

        const noteOrErr = await goodsReturnNoteRepository.getById(ID.fromString("GD - 1001"));
        const note = <GoodsReturnNote>noteOrErr.value;

        expect(note.goodsIssueNoteId.toString()).toBe("GS - 1000");
    });

    it("Deve adicionar as linhas de devolução no documento de devolução", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1001", quantity: 1, comment: "Riscado" },
            { itemId: "1002", quantity: 1 },
        ];
        const { service, goodsReturnNoteRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, securityDepositWithHeld, itemsData);

        const noteOrErr = await goodsReturnNoteRepository.getById(ID.fromString("GD - 1001"));
        const note = <GoodsReturnNote>noteOrErr.value;

        expect(note.goodsReturnLines.length).toBe(2);
    });

    it("Deve registrar o memento em que a devolução foi efectuada", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1001", quantity: 1, comment: "Riscado" },
            { itemId: "1002", quantity: 1 },
        ];
        const { service, goodsReturnNoteRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, securityDepositWithHeld, itemsData);

        const noteOrErr = await goodsReturnNoteRepository.getById(ID.fromString("GD - 1001"));
        const note = <GoodsReturnNote>noteOrErr.value;

        expect(note.issuedAt.getTime()).toBeLessThanOrEqual(new Date().getTime());
    });

    it("Deve registrar o identificador do documento de devolução", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1001", quantity: 1, comment: "Riscado" },
            { itemId: "1002", quantity: 1 },
        ];
        const { service, goodsReturnNoteRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, securityDepositWithHeld, itemsData);

        const noteOrErr = await goodsReturnNoteRepository.getById(ID.fromString("GD - 1001"));
        const note = <GoodsReturnNote>noteOrErr.value;

        expect(note.goodsReturnNoteId.toString()).toBe("GD - 1001");
    });

    it("Deve retornar o erro **GoodsIssueNoteHasBenReturned** se a guia de saída de mercadoria já foi devolvida por completo", async () => {
        const goodsIssueNoteId = "GS - 1003";
        const itemsData = [{ itemId: "1006", quantity: 2, comment: "Riscado" }];

        const { service } = makeService();

        await service.returningGoods(goodsIssueNoteId, securityDepositWithHeld, itemsData);

        const error = await service.returningGoods(
            goodsIssueNoteId,
            securityDepositWithHeld,
            itemsData
        );

        expect(error.isLeft()).toBeTruthy();
    });

    it("Deve armazenar no repositório os dados da condição dos artigos devolvidos", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1001", quantity: 1, comment: "Riscado" },
            { itemId: "1002", quantity: 1 },
        ];
        const { service, goodsReturnNoteRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, securityDepositWithHeld, itemsData);

        const noteOrErr = await goodsReturnNoteRepository.getById(ID.fromString("GD - 1001"));
        const note = <GoodsReturnNote>noteOrErr.value;

        expect(note.goodsReturnLines[0].condition?.comment).toBe("Riscado");
    });

    it("Deve armazernar no repositório os nomes dos artigos devolvidos", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1001", quantity: 1, comment: "Riscado" },
            { itemId: "1002", quantity: 1 },
        ];
        const { service, goodsReturnNoteRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, securityDepositWithHeld, itemsData);

        const noteOrErr = await goodsReturnNoteRepository.getById(ID.fromString("GD - 1001"));
        const note = <GoodsReturnNote>noteOrErr.value;

        expect(note.goodsReturnLines[0].name).toBe("T-shirt desportiva gola redonda");
        expect(note.goodsReturnLines[1].name).toBe("Calça Jeans Skinny");
    });

    it("Deve armazenar a variação dos artigos devolvidos no repositório", async () => {
        const goodsIssueNoteId = "GS - 1000";
        const itemsData = [
            { itemId: "1001", quantity: 1, comment: "Riscado" },
            { itemId: "1002", quantity: 1 },
        ];
        const { service, goodsReturnNoteRepository } = makeService();

        await service.returningGoods(goodsIssueNoteId, securityDepositWithHeld, itemsData);

        const noteOrErr = await goodsReturnNoteRepository.getById(ID.fromString("GD - 1001"));
        const note = <GoodsReturnNote>noteOrErr.value;

        expect(note.goodsReturnLines[0].variationsValues).toEqual({
            "1": "Cor: Branco",
            "2": "Marca: Nike",
        });
        expect(note.goodsReturnLines[1].variationsValues).toEqual({
            "1": "Cor: Castanho",
            "2": "Marca: Gucci",
        });
    });

    it("Deve verificar se as quantidades devolvidas estão no intervalo das quantidades solicitas e as quantidades devolvidas", async () => {
        const goodsIssueNoteId = "GS - 1004";
        const itemsData = [{ itemId: "1007", quantity: 1 }];
        const itemsData1 = [{ itemId: "1007", quantity: 3 }];

        const { service } = makeService();

        await service.returningGoods(goodsIssueNoteId, securityDepositWithHeld, itemsData);

        const error = await service.returningGoods(
            goodsIssueNoteId,
            securityDepositWithHeld,
            itemsData1
        );

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidGoodsIssueLineQuantity);
    });
});

describe("GoodsReturnService - Recuperar guias de devoluções", () => {
    it("Deve retornar a lista de guias de devolução de artigos", async () => {
        const { service } = makeService();

        const notes = await service.list();

        expect(notes.length).toBe(0);
    });

    it("Deve retornar a lista de guias de devolução de artigos", async () => {
        const { service } = makeService();
        const itemsData = [
            { itemId: "1001", quantity: 1, comment: "Riscado" },
            { itemId: "1002", quantity: 1 },
        ];

        await service.returningGoods("GS - 1000", securityDepositWithHeld, itemsData);

        const notes = await service.list();

        expect(notes.length).toBe(1);
    });
});

describe("GoodsReturnService - Recuperar guia de devolução", () => {
    it("Deve retornar a guia de devolução de artigos com base no ID", async () => {
        const itemsData = [
            { itemId: "1001", quantity: 1, comment: "Riscado" },
            { itemId: "1002", quantity: 1 },
        ];
        const goodsIssueNoteId = "GS - 1000";
        const { service } = makeService();

        await service.returningGoods(goodsIssueNoteId, securityDepositWithHeld, itemsData);

        const noteOrErr = await service.get("GD - 1001");
        const note = <GoodsReturnNote>noteOrErr.value;

        expect(note).toBeDefined();
        expect(note.goodsIssueNoteId.toString()).toEqual(goodsIssueNoteId);
        expect(note.goodsReturnNoteId.toString()).toEqual("GD - 1001");
    });

    it("Deve retornar o erro **GoodsReturnNoteNotFound** se a guia de devolução de artigos não for encontrada no repositório", async () => {
        const { service } = makeService();

        const error = await service.get("GD - 1001");

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(GoodsReturnNoteNotFound);
    });
});

const securityDepositWithHeld = 100;

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
