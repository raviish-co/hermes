import { describe, expect, it } from "vitest";
import { DefaultPurposeSpecification } from "../../adapters/default_purpose_specification";
import { SequenceGenerator } from "../../adapters/sequences/sequence_generator";
import { GoodsIssueService } from "../../application/goods_issue_service";
import { InsufficientStock } from "../../domain/catalog/items/insufficient_stock_error";
import { ItemNotFound } from "../../domain/catalog/items/item_not_found_error";
import type { ItemRepository } from "../../domain/catalog/items/item_repository";
import type { GoodsIssueNote } from "../../domain/goods_issue/goods_issue_note";
import { GoodsIssueNoteNotFound } from "../../domain/goods_issue/goods_issue_note_not_found_error";
import type { GoodsIssueNoteRepository } from "../../domain/goods_issue/goods_issue_note_repository";
import { InvalidPurpose } from "../../domain/goods_issue/invalid_purpose_error";
import { InvalidTotal } from "../../domain/goods_issue/invalid_total_error";
import type { ItemStock } from "../../domain/warehouse/item_stock";
import { InmemGoodsIssueNoteRepository } from "../../persistence/inmem/inmem_goods_issue_note_repository";
import { InmemSequenceStorage } from "../../persistence/inmem/inmem_sequence_storage";
import { ID } from "../../shared/id";
import { GoodsIssueNoteRepositoryStub } from "../stubs/goods_issue_note_repository_stub";
import { ItemRepositoryStub } from "../stubs/item_repository_stub";
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
        const lines = [{ itemId: "9999", goodQuantities: 1 }];
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
        const { service, noteRepository } = makeService();

        await service.new({
            ...goodsIssueData,
            lines,
            total: 4500,
        });

        const note = await noteRepository.last();
        const line = note.lines[0];

        expect(note.lines.length).toBe(1);
        expect(line.itemId.toString()).toEqual("1001");
        expect(line.netTotal.value).toEqual(4500);
        expect(line.total).toEqual(1);
    });

    it("Deve criar uma guida de saída de mercadoria de mais de um linha", async () => {
        const lines = [
            { itemId: "1001", goodQuantities: 1 },
            { itemId: "1002", goodQuantities: 1 },
        ];
        const total = 20000;
        const { service, noteRepository } = makeService();

        await service.new({
            ...goodsIssueData,
            lines,
            total,
        });

        const note = await noteRepository.last();

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
        const { service, noteRepository } = makeService();

        await service.new(goodsIssueData);

        const note = await noteRepository.last();

        expect(note.returnDate).toBeDefined();
        expect(note.returnDate).toBeInstanceOf(Date);
    });

    it("Deve calcular o valor total da guia de saída de mercadorias", async () => {
        const { service, noteRepository } = makeService();

        await service.new(goodsIssueData);

        const note = await noteRepository.last();

        expect(note.total.value).toEqual(55500);
    });

    it("Deve criar guia com artigos de diferentes quantidades", async () => {
        const { service, noteRepository } = makeService();

        await service.new(goodsIssueData);

        const note = await noteRepository.last();

        expect(note.lines[0].total).toEqual(2);
        expect(note.lines[1].total).toEqual(3);
    });

    it("A linha da guia de saída deve registar a quantidade de artigos em bom estado e em mau estado", async () => {
        const data = {
            ...goodsIssueData,
            lines: [
                {
                    itemId: "1008",
                    goodQuantities: 10,
                    badQuantities: 3,
                },
            ],
            total: 97500,
        };

        const { service, noteRepository } = makeService();

        await service.new(data);

        const note = await noteRepository.last();

        expect(note.lines[0].goodQuantities).toEqual(10);
        expect(note.lines[0].badQuantities).toEqual(3);
        expect(note.lines[0].total).toEqual(13);
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

        // const itemsStock = <ItemStock[]>itemsStockOrErr.value;

        const stock1 = itemsStock[0];
        const stock2 = itemsStock[1];

        expect(itemsStock.length).toBe(2);
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

        // const itemsStock = <ItemStock[]>itemsStockOrErr.value;

        expect(itemsStock.length).toBe(1);

        const stock = itemsStock[0];

        expect(stock.badQuantities).toEqual(4);
        expect(stock.goodQuantities).toEqual(9);
    });

    it("Deve criar a guia de saída de mercadoria com os detalhes da finalidade", async () => {
        const { service, noteRepository } = makeService();

        await service.new(goodsIssueData);

        const note = await noteRepository.last();

        expect(note.purpose.details).toBeDefined();
        expect(note.purpose.details).toEqual("Interna");
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

        const { service, noteRepository } = makeService();

        await service.new(data);

        const note = await noteRepository.last();

        expect(note.purpose.notes).toBeDefined();
        expect(note.purpose.notes).toEqual("John Doe");
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

    it("Deve retornar **InsufficientStock** se não tiver quantidades suficiente em stock de algum artigo em mau estado", async () => {
        const data = {
            ...goodsIssueData,
            lines: [
                {
                    itemId: "1001",
                    goodQuantities: 4,
                    badQuantities: 5,
                },
            ],
        };

        const { service } = makeService();

        const error = await service.new(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InsufficientStock);
    });

    it("Deve gerar o ID da guia de saída de mercadoria,", async () => {
        const { service, noteRepository } = makeService();

        await service.new(goodsIssueData);

        const noteOrErr = await noteRepository.getById(ID.fromString("GS - 1000"));
        const note = <GoodsIssueNote>noteOrErr.value;

        expect(note.noteId).toBeDefined();
        expect(note.noteId).toBeInstanceOf(ID);
        expect(note.noteId.toString()).toEqual("GS - 1000");
    });

    it("Deve gerar 2 solicitações com IDs diferentes", async () => {
        const { service, noteRepository } = makeService();

        await service.new(goodsIssueData);
        await service.new(goodsIssueData);

        const note1OrErr = await noteRepository.getById(ID.fromString("GS - 1000"));
        const note2OrErr = await noteRepository.getById(ID.fromString("GS - 1001"));

        const note1 = <GoodsIssueNote>note1OrErr.value;
        const note2 = <GoodsIssueNote>note2OrErr.value;

        expect(note1.noteId.toString()).toEqual("GS - 1000");
        expect(note2.noteId.toString()).toEqual("GS - 1001");
    });
});

describe("GoodsIssueService - Recuperar as guias de saída de mercadorias", () => {
    it("Deve retornar uma lista vazia se não houver guias de saídas no repositório", async () => {
        const { service } = makeService();

        const notes = await service.list();

        expect(notes.length).toBe(0);
    });

    it("Deve recuperar as guias de saídas presentes no repositório", async () => {
        const goodsIssueRepository = new GoodsIssueNoteRepositoryStub();
        const { service } = makeService({ goodsIssueRepository });

        const notes = await service.list();

        expect(notes.length).toBeGreaterThanOrEqual(1);

        const note = notes[0];

        expect(note.noteId.toString()).toEqual("GS - 1000");
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
        const goodsIssueRepository = new GoodsIssueNoteRepositoryStub();
        const { service } = makeService({ goodsIssueRepository });

        const noteOrErr = await service.get("GS - 1000");
        const note = <GoodsIssueNote>noteOrErr.value;

        expect(noteOrErr.isRight()).toBeTruthy();
        expect(note.noteId.toString()).toEqual("GS - 1000");
    });
});

describe("GoodsIssueService - Pesquisar guia de saída de mercadoria", () => {
    it("Deve recuperar as guias com a mesma sequência de caracteres no ID", async () => {
        const goodsIssueRepository = new GoodsIssueNoteRepositoryStub();
        const { service } = makeService({ goodsIssueRepository });

        const notes = await service.search("GS - 1");

        expect(notes.length).toBeGreaterThanOrEqual(6);
    });

    it("Deve recuperar as guias com a mesma sequência de caracteres na finalidade", async () => {
        const goodsIssueRepository = new GoodsIssueNoteRepositoryStub();
        const { service } = makeService({ goodsIssueRepository });

        const notes = await service.search("Uso Pessoal");

        expect(notes.length).toBeGreaterThanOrEqual(1);
    });

    it("Deve recuperar as guias com a mesma sequência de caracteres no detalhe da finalidade", async () => {
        const goodsIssueRepository = new GoodsIssueNoteRepositoryStub();
        const { service } = makeService({ goodsIssueRepository });

        const notes = await service.search("John Doe");

        expect(notes.length).toBeGreaterThanOrEqual(1);
    });

    it("Deve recuperar as guias com a mesma sequência de caracteres nas notas da finalidade", async () => {
        const goodsIssueRepository = new GoodsIssueNoteRepositoryStub();
        const { service } = makeService({ goodsIssueRepository });

        const notes = await service.search("Deadpool");

        expect(notes.length).toBeGreaterThanOrEqual(1);
    });

    it("Deve pesquisar as guias por letras minúsculas", async () => {
        const goodsIssueRepository = new GoodsIssueNoteRepositoryStub();
        const { service } = makeService({ goodsIssueRepository });

        const notes = await service.search("Uso PessoaL");

        expect(notes.length).toBeGreaterThanOrEqual(1);
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
