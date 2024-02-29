import { InmemGoodsIssueRepository } from "../../persistense/inmem/inmem_goods_issue_repository";
import type { ItemRepository } from "../../domain/catalog/item_repository";
import { InsufficientStock } from "../../domain/catalog/insufficient_stock_error";
import { DefaultPurposeSpecification } from "../../adapters/default_purpose_specification";
import { InmemSequenceStorage } from "../../persistense/inmem/inmem_sequence_storage";
import { SequenceGenerator } from "../../domain/sequences/sequence_generator";
import { InvalidPurpose } from "../../domain/goods_issue/invalid_purpose_error";
import { InvalidTotal } from "../../domain/goods_issue/invalid_total_error";
import { GoodsIssueService } from "../../application/goods_issue_service";
import { ItemNotFound } from "../../domain/catalog/item_not_found_error";
import { ItemRepositoryStub } from "../stubs/item_repository_stub";
import { describe, expect, it, vi } from "vitest";
import { ID } from "../../shared/id";
import type { GoodsIssueRepository } from "../../domain/goods_issue/goods_issue_note_repository";
import { GoodsIssueRepositoryStub } from "../stubs/goods_issue_repository_stub";
import type { GoodsIssueNote } from "../../domain/goods_issue/goods_issue_note";

describe("Test Goods Issue", () => {
    it("Deve retornar error **InvalidPurpose** se não existir", async () => {
        const data = {
            ...goodsIssueData,
            purposeSpecification: { description: "Alguel" },
        };
        const { service } = makeService();

        const error = await service.new(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidPurpose);
    });

    it("Deve chamar o método **getAll** no repositório de artigos", async () => {
        const lines = [{ itemId: "1001", quantity: 1 }];
        const { service, itemRepository } = makeService();
        const spy = vi.spyOn(itemRepository, "findAll");

        await service.new({ ...goodsIssueData, lines });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith([ID.fromString("1001")]);
    });

    it("Deve retornar um erro **ItemNotFound** se não existir", async () => {
        const lines = [{ itemId: "1008", quantity: 1 }];
        const { service } = makeService();

        const error = await service.new({
            ...goodsIssueData,
            lines,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(ItemNotFound);
    });

    it("Deve chamar o método **save** no repositório de guia de saída de mercadoria", async () => {
        const lines = [{ itemId: "1001", quantity: 1 }];
        const total = "4500,00";
        const { service, goodsIssueRepository } = makeService();

        const spy = vi.spyOn(goodsIssueRepository, "save");

        await service.new({
            ...goodsIssueData,
            lines,
            total,
        });

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Deve efectuar a nota de saída de mercadoria, de um uníco artigo", async () => {
        const lines = [{ itemId: "1001", quantity: 1 }];
        const { service, goodsIssueRepository } = makeService();

        await service.new({
            ...goodsIssueData,
            lines,
            total: "4500,00",
        });

        const goodsIssue = await goodsIssueRepository.last();
        const goodsIssueLine = goodsIssue.goodsIssueLines[0];

        expect(goodsIssue.goodsIssueLines.length).toBe(1);
        expect(goodsIssueLine.itemId.toString()).toEqual("1001");
        expect(goodsIssueLine.total.value).toEqual("4500,00");
        expect(goodsIssueLine.quantity).toEqual(1);
    });

    it("Deve efectuar a nota de saída de mercadoria, de mais de um artigo", async () => {
        const lines = [
            { itemId: "1001", quantity: 1 },
            { itemId: "1002", quantity: 1 },
        ];
        const total = "20000,00";
        const securityDeposit = "40000,00";
        const { service, goodsIssueRepository } = makeService();

        await service.new({
            ...goodsIssueData,
            lines,
            total,
        });

        const goodsIssue = await goodsIssueRepository.last();
        expect(goodsIssue.goodsIssueLines.length).toBe(2);
        expect(goodsIssue.getTotal().value).toEqual(total);
    });

    it("Deve retornar **InvalidTotal** se o total enviado pelo solicitante for diferente do total a pagar da nota de saída de mercadoria,", async () => {
        const total = "25,00";
        const { service } = makeService();

        const error = await service.new({
            ...goodsIssueData,
            total,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidTotal);
    });

    it("Deve registrar a data de devolução da nota de saída de mercadoria,", async () => {
        const { service, goodsIssueRepository } = makeService();

        await service.new(goodsIssueData);

        const goodsIssue = await goodsIssueRepository.last();

        expect(goodsIssue.returnDate).toBeDefined();
        expect(goodsIssue.returnDate).toBeInstanceOf(Date);
    });

    it("Deve solicitar vários artigos com diferentes quantidades", async () => {
        const { service, goodsIssueRepository } = makeService();

        await service.new(goodsIssueData);

        const goodsIssue = await goodsIssueRepository.last();

        expect(goodsIssue.goodsIssueLines.length).toBe(2);
        expect(goodsIssue.getTotal().value).toEqual("55500,00");
    });

    it("Deve retornar **InsufficientStock** se a quantidade solicitada for maior que a quantidade em estoque", async () => {
        const lines = [
            { itemId: "1001", quantity: 10 },
            { itemId: "1002", quantity: 15 },
        ];

        const { service } = makeService();
        const error = await service.new({
            ...goodsIssueData,
            lines,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InsufficientStock);
    });

    it("Deve atualizar o estoque dos artigos solicitados no repositório", async () => {
        const { service, itemRepository } = makeService({});

        const spy = vi.spyOn(itemRepository, "updateAll");

        await service.new(goodsIssueData);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Deve diminuir o estoque dos artigos solicitados", async () => {
        const { service, itemRepository } = makeService();

        await service.new(goodsIssueData);

        const item = await itemRepository.getById(ID.fromString("1001"));

        const stock = item.getStock();

        expect(stock.quantity).toEqual(8);
    });

    it("Deve ser adicionada a nota de saída de mercadoria,, caso a finalidade tenha uma seção", async () => {
        const { service, goodsIssueRepository } = makeService();

        await service.new(goodsIssueData);

        const goodsIssue = await goodsIssueRepository.last();

        expect(goodsIssue.purpose.details).toBeDefined();
        expect(goodsIssue.purpose.details).toEqual("Interna");
    });

    it("Deve ser adicionada a nota de saída de mercadoria, caso a finalidade tenha um nota", async () => {
        const data = {
            ...goodsIssueData,
            purposeSpecification: {
                description: "Lavandaria",
                detailsConstraint: "Externa",
                notes: "John Doe",
            },
        };

        const { service, goodsIssueRepository } = makeService();

        await service.new(data);

        const goodsIssue = await goodsIssueRepository.last();

        expect(goodsIssue.purpose.notes).toBeDefined();
        expect(goodsIssue.purpose.notes).toEqual("John Doe");
    });

    it("Deve retornar **InsufficientStock** se a quantidade solicitada de uma variação não tiver estoque suficiente", async () => {
        const lines = [
            { itemId: "1001", quantity: 2 },
            { itemId: "1002", quantity: 3 },
            { itemId: "1003", quantity: 14 },
        ];
        const { service } = makeService();

        const error = await service.new({
            ...goodsIssueData,
            lines,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InsufficientStock);
    });

    it("Deve gerar o ID da nota de saída de mercadoria,", async () => {
        const { service, goodsIssueRepository } = makeService();

        await service.new(goodsIssueData);

        const goodsIssueOrErr = await goodsIssueRepository.getById(ID.fromString("GS - 1000"));
        const goodsIssue = <GoodsIssueNote>goodsIssueOrErr.value;

        expect(goodsIssue.goodsIssueNoteId).toBeDefined();
        expect(goodsIssue.goodsIssueNoteId).toBeInstanceOf(ID);
        expect(goodsIssue.goodsIssueNoteId.toString()).toEqual("GS - 1000");
    });

    it("Deve gerar 2 solicitações com IDs diferentes", async () => {
        const { service, goodsIssueRepository } = makeService();

        await service.new(goodsIssueData);
        await service.new(goodsIssueData);

        const goodsIssue1rErr = await goodsIssueRepository.getById(ID.fromString("GS - 1000"));
        const goodsIssue2rErr = await goodsIssueRepository.getById(ID.fromString("GS - 1001"));

        const goodsIssue1 = <GoodsIssueNote>goodsIssue1rErr.value;
        const goodsIssue2 = <GoodsIssueNote>goodsIssue2rErr.value;

        expect(goodsIssue1.goodsIssueNoteId.toString()).toEqual("GS - 1000");
        expect(goodsIssue2.goodsIssueNoteId.toString()).toEqual("GS - 1001");
    });

    it("Deve receber o estado atual dos artigos solicitados", async () => {
        const { service, itemRepository } = makeService();

        await service.new(goodsIssueData);

        const item1 = await itemRepository.getById(ID.fromString("1001"));
        const item2 = await itemRepository.getById(ID.fromString("1002"));

        expect(item1.getCondition().status).toEqual("Bom");
        expect(item2.getCondition().status).toEqual("Mau");
        expect(item1.getCondition().comment).toBeUndefined();
        expect(item2.getCondition().comment).toEqual("T-shirt rasgada");
    });
});

describe("List Goods Issue Notes", () => {
    it("Deve retornar uma lista vazia se não houver guias de saídas", async () => {
        const { service } = makeService();

        const goodsIssues = await service.list();

        expect(goodsIssues.length).toBe(0);
    });

    it("Deve recuperar as guias de saídas presentes no repositório", async () => {
        const goodsIssueRepository = new GoodsIssueRepositoryStub();
        const { service } = makeService({ goodsIssueRepository });

        const goodsIssues = await service.list();

        expect(goodsIssues.length).toBe(1);

        const goodsIssue = goodsIssues[0];

        expect(goodsIssue.goodsIssueNoteId.toString()).toEqual("GS - 1000");
    });
});

const goodsIssueData = {
    purposeSpecification: {
        description: "Lavandaria",
        detailsConstraint: "Interna",
        notes: "Nome",
    },
    lines: [
        {
            itemId: "1001",
            quantity: 2,
            condition: { status: "Bom" },
        },
        {
            itemId: "1002",
            quantity: 3,
            condition: { status: "Mau", comment: "T-shirt rasgada" },
        },
    ],
    total: "55500,00",
    returnDate: "2021-01-01T16:40:00",
    userId: "1000",
};

interface Dependencies {
    itemRepository?: ItemRepository;
    goodsIssueRepository?: GoodsIssueRepository;
}

function makeService(deps?: Dependencies) {
    const purposeSource = new DefaultPurposeSpecification();
    const itemRepository = deps?.itemRepository ?? new ItemRepositoryStub();
    const goodsIssueRepository = deps?.goodsIssueRepository ?? new InmemGoodsIssueRepository();
    const storage = new InmemSequenceStorage();
    const generator = new SequenceGenerator(storage, 1000);
    const service = new GoodsIssueService(
        itemRepository,
        goodsIssueRepository,
        generator,
        purposeSource
    );

    return { goodsIssueRepository, service, itemRepository, purposeSource };
}
