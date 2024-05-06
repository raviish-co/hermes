import { InmemGoodsIssueNoteRepository } from "../../persistense/inmem/inmem_goods_issue_note_repository";
import type { GoodsIssueNoteRepository } from "../../domain/goods_issue/goods_issue_note_repository";
import { GoodsIssueNoteNotFound } from "../../domain/goods_issue/goods_issue_note_not_found_error";
import { DefaultPurposeSpecification } from "../../adapters/default_purpose_specification";
import { InmemSequenceStorage } from "../../persistense/inmem/inmem_sequence_storage";
import { InsufficientStock } from "../../domain/catalog/items/insufficient_stock_error";
import { InvalidPurpose } from "../../domain/goods_issue/invalid_purpose_error";
import { SequenceGenerator } from "../../adapters/sequences/sequence_generator";
import { InvalidTotal } from "../../domain/goods_issue/invalid_total_error";
import { GoodsIssueService } from "../../application/goods_issue_service";
import type { ItemRepository } from "../../domain/catalog/items/item_repository";
import { ItemNotFound } from "../../domain/catalog/items/item_not_found_error";
import { GoodsIssueRepositoryStub } from "../stubs/goods_issue_repository_stub";
import type { GoodsIssueNote } from "../../domain/goods_issue/goods_issue_note";
import { ItemRepositoryStub } from "../stubs/item_repository_stub";
import { describe, expect, it } from "vitest";
import { ID } from "../../shared/id";
import type { Item } from "../../domain/catalog/items/item";
import { ItemStockRepositoryStub } from "../stubs/item_stock_repository_stub";

describe("GoodsIssueService - Saída de mercadoria", () => {
    it("Deve retornar error **InvalidPurpose** se não existir", async () => {
        const data = { ...goodsIssueData, purpose: { description: "Alguel", notes: "some-note" } };
        const { service } = makeService();

        const error = await service.new(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidPurpose);
    });

    it("Deve retornar **InvalidPurpose** se o detalhe da finalidade for inválido", async () => {
        const data = {
            ...goodsIssueData,
            purpose: { description: "Lavandaria", notes: "some-note" },
        };
        const { service } = makeService();

        const error = await service.new(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidPurpose);
    });

    it("Deve retornar um erro **ItemNotFound** se o artigo não existir no repositório", async () => {
        const lines = [{ itemId: "1009", goodQuantities: 1 }];
        const { service } = makeService();

        const error = await service.new({
            ...goodsIssueData,
            lines,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(ItemNotFound);
    });

    it("Deve efectuar a guia de saída de mercadoria de um uníco artigo", async () => {
        const lines = [{ itemId: "1001", goodQuantities: 1 }];
        const { service, noteRepository: goodsIssueRepository } = makeService();

        await service.new({
            ...goodsIssueData,
            lines,
            total: 4500,
        });

        const note = await goodsIssueRepository.last();
        const noteLine = note.lines[0];

        expect(note.lines.length).toBe(1);
        expect(noteLine.itemId.toString()).toEqual("1001");
        expect(noteLine.total.value).toEqual(4500);
        expect(noteLine.quantityRequested).toEqual(1);
    });

    it("Deve criar uma guida de saída de mercadoria de mais de um linha", async () => {
        const lines = [
            { itemId: "1001", goodQuantities: 1 },
            { itemId: "1002", goodQuantities: 1 },
        ];
        const total = 20000;
        const { service, noteRepository: goodsIssueRepository } = makeService();

        await service.new({
            ...goodsIssueData,
            lines,
            total,
        });

        const note = await goodsIssueRepository.last();

        expect(note.lines.length).toBe(2);
    });

    it("Deve retornar **InvalidTotal** se o total enviado pelo solicitante for diferente do total calculado na guida de saída de mercadoria,", async () => {
        const total = 25;
        const { service } = makeService();

        const error = await service.new({
            ...goodsIssueData,
            total,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidTotal);
    });

    it("Deve registrar a data de devolução da guia de saída de mercadoria,", async () => {
        const { service, noteRepository: goodsIssueRepository } = makeService();

        await service.new(goodsIssueData);

        const goodsIssue = await goodsIssueRepository.last();

        expect(goodsIssue.returnDate).toBeDefined();
        expect(goodsIssue.returnDate).toBeInstanceOf(Date);
    });

    it("Deve calcular o valor total da guia de saída de mercadorias", async () => {
        const { service, noteRepository: goodsIssueRepository } = makeService();

        await service.new(goodsIssueData);

        const note = await goodsIssueRepository.last();

        expect(note.getTotal().value).toEqual(55500);
    });

    it("Deve solicitar vários artigos com diferentes quantidades", async () => {
        const { service, noteRepository } = makeService();

        await service.new(goodsIssueData);

        const note = await noteRepository.last();

        expect(note.lines[0].quantityRequested).toEqual(2);
        expect(note.lines[1].quantityRequested).toEqual(3);
    });

    it("Deve retornar **InsufficientStock** se a quantidade de algum artigo solicitado for maior que o seu stock", async () => {
        const lines = [
            { itemId: "1001", goodQuantities: 10 },
            { itemId: "1002", goodQuantities: 15 },
        ];

        const { service } = makeService();
        const error = await service.new({
            ...goodsIssueData,
            lines,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InsufficientStock);
    });

    it("Deve reduzir o stock dos artigos solicitados", async () => {
        const { service, itemStockRepository } = makeService();

        await service.new(goodsIssueData);

        const itemsStock = await itemStockRepository.findAll([
            ID.fromString("1001"),
            ID.fromString("1002"),
        ]);

        expect(itemsStock.length).toBe(2);

        const stock1 = itemsStock[0];
        const stock2 = itemsStock[1];

        expect(stock1.total).toEqual(8);
        expect(stock2.total).toEqual(7);
    });

    it("Deve reduzir o stock dos artigos em mau estado, se foi solicitado artigos em mau estado", async () => {
        const data = {
            ...goodsIssueData,
            lines: [
                {
                    itemId: "1008",
                    goodQuantities: 1,
                    badQuantities: 1,
                },
            ],
        };

        const { service, itemStockRepository } = makeService();

        await service.new(data);

        const itemsStock = await itemStockRepository.findAll([ID.fromString("1008")]);

        expect(itemsStock.length).toBe(1);

        const stock = itemsStock[0];

        expect(stock.badQuantities).toEqual(4);
        expect(stock.goodQuantities).toEqual(9);
    });

    it("Deve criar a guia de saída de mercadoria com os detalhes da finalidade", async () => {
        const { service, noteRepository: goodsIssueRepository } = makeService();

        await service.new(goodsIssueData);

        const goodsIssue = await goodsIssueRepository.last();

        expect(goodsIssue.purpose.details).toBeDefined();
        expect(goodsIssue.purpose.details).toEqual("Interna");
    });

    it("Deve ser adicionada a guia de saída de mercadoria, caso a finalidade tenha um guia", async () => {
        const data = {
            ...goodsIssueData,
            purpose: {
                description: "Lavandaria",
                details: "Externa",
                notes: "John Doe",
            },
        };

        const { service, noteRepository: goodsIssueRepository } = makeService();

        await service.new(data);

        const goodsIssue = await goodsIssueRepository.last();

        expect(goodsIssue.purpose.notes).toBeDefined();
        expect(goodsIssue.purpose.notes).toEqual("John Doe");
    });

    it("Deve retornar **InsufficientStock** se não tiver quantidades suficiente em stock de algum artigo", async () => {
        const lines = [
            { itemId: "1001", goodQuantities: 2 },
            { itemId: "1002", goodQuantities: 3 },
            { itemId: "1003", goodQuantities: 14 },
        ];
        const { service } = makeService();

        const error = await service.new({
            ...goodsIssueData,
            lines,
        });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InsufficientStock);
    });

    it("Deve gerar o ID da guia de saída de mercadoria,", async () => {
        const { service, noteRepository } = makeService();

        await service.new(goodsIssueData);

        const noteOrErr = await noteRepository.getById(ID.fromString("GS - 1000"));
        const note = <GoodsIssueNote>noteOrErr.value;

        expect(note.goodsIssueNoteId).toBeDefined();
        expect(note.goodsIssueNoteId).toBeInstanceOf(ID);
        expect(note.goodsIssueNoteId.toString()).toEqual("GS - 1000");
    });

    it("Deve gerar 2 solicitações com IDs diferentes", async () => {
        const { service, noteRepository } = makeService();

        await service.new(goodsIssueData);
        await service.new(goodsIssueData);

        const note1OrErr = await noteRepository.getById(ID.fromString("GS - 1000"));
        const note2OrErr = await noteRepository.getById(ID.fromString("GS - 1001"));

        const note1 = <GoodsIssueNote>note1OrErr.value;
        const note2 = <GoodsIssueNote>note2OrErr.value;

        expect(note1.goodsIssueNoteId.toString()).toEqual("GS - 1000");
        expect(note2.goodsIssueNoteId.toString()).toEqual("GS - 1001");
    });

    it("Deve receber o estado actual dos artigos solicitados", async () => {
        const { service, itemRepository } = makeService();

        await service.new(goodsIssueData);

        const item1OrErr = await itemRepository.getById(ID.fromString("1001"));
        const item2OrErr = await itemRepository.getById(ID.fromString("1002"));

        const item1 = <Item>item1OrErr.value;
        const item2 = <Item>item2OrErr.value;

        expect(item1.getCondition().status).toEqual("Bom");
        expect(item2.getCondition().status).toEqual("Mau");
        expect(item1.getCondition().comment).toBeUndefined();
        expect(item2.getCondition().comment).toEqual("T-shirt rasgada");
    });
});

describe("GoodsIssueService - Recuperar as guias de saída de mercadorias", () => {
    it("Deve retornar uma lista vazia se não houver guias de saídas no repositório", async () => {
        const { service } = makeService();

        const goodsIssues = await service.list();

        expect(goodsIssues.length).toBe(0);
    });

    it("Deve recuperar as guias de saídas presentes no repositório", async () => {
        const goodsIssueRepository = new GoodsIssueRepositoryStub();
        const { service } = makeService({ goodsIssueRepository });

        const goodsIssues = await service.list();

        expect(goodsIssues.length).toBeGreaterThanOrEqual(1);

        const goodsIssue = goodsIssues[0];

        expect(goodsIssue.goodsIssueNoteId.toString()).toEqual("GS - 1000");
    });
});

describe("GoodsIssueService - Recuperar guia de saída de mercadoria ", () => {
    it("Deve retornar **GoodsIssueNoteFound** se a guia de saída não existir no repositório", async () => {
        const goodsIssueRepository = new InmemGoodsIssueNoteRepository();

        const { service } = makeService({ goodsIssueRepository });

        const error = await service.get("GS - 1000");

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(GoodsIssueNoteNotFound);
    });

    it("Deve retornar a guia de saída de mercadoria", async () => {
        const goodsIssueRepository = new GoodsIssueRepositoryStub();
        const { service } = makeService({ goodsIssueRepository });

        const goodsIssueOrErr = await service.get("GS - 1000");
        const goodsIssue = <GoodsIssueNote>goodsIssueOrErr.value;

        expect(goodsIssueOrErr.isRight()).toBeTruthy();
        expect(goodsIssue.goodsIssueNoteId.toString()).toEqual("GS - 1000");
    });
});

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
            condition: { status: "Bom" },
        },
        {
            itemId: "1002",
            goodQuantities: 3,
            condition: { status: "Mau", comment: "T-shirt rasgada" },
        },
    ],
    total: 55500,
    returnDate: "2021-01-01T16:40:00",
    userId: "1000",
};

interface Dependencies {
    itemRepository?: ItemRepository;
    goodsIssueRepository?: GoodsIssueNoteRepository;
}

function makeService(deps?: Dependencies) {
    const purposeSource = new DefaultPurposeSpecification();
    const itemRepository = deps?.itemRepository ?? new ItemRepositoryStub();
    const noteRepository = deps?.goodsIssueRepository ?? new InmemGoodsIssueNoteRepository();
    const storage = new InmemSequenceStorage();
    const generator = new SequenceGenerator(storage, 1000);
    const itemStockRepository = new ItemStockRepositoryStub();
    const service = new GoodsIssueService(
        itemRepository,
        itemStockRepository,
        noteRepository,
        generator,
        purposeSource
    );

    return {
        noteRepository,
        service,
        itemRepository,
        purposeSource,
        itemStockRepository,
    };
}
