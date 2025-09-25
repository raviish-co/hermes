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
import type { i } from "vitest/dist/reporters-yx5ZTtEV.js";
import { InvalidQuantitiesError } from "../../application/invalid_quantities_error";

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
        const data = { entryDate: "2024-03-01T16:40:00", userId: "1000" };
        const { service } = makeService();

        const error = await service.new(data as any);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidLines);
    });

    it("Deve actualizar a quantidade em estoque dos artigos", async () => {
        const data = {
            lines: [
                { itemId: "1001", goodQuantities: 50 },
                { itemId: "1002", goodQuantities: 20 },
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
                },
                {
                    itemId: "1003",
                    goodQuantities: 20,
                    badQuantities: 15,
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
                { itemId: "1001", goodQuantities: 50 },
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

    it("Deve registar na guia de entrada de mercadoria o número de itens em bom estado", async () => {
        const data = {
            lines: [
                { itemId: "1001", goodQuantities: 50 },
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
    });

    it("Deve registar na guia de entrada de mercadoria o número de itens em mau estado", async () => {
        const data = {
            lines: [
                {
                    itemId: "1001",
                    goodQuantities: 50,
                    badQuantities: 15,
                },
                {
                    itemId: "1002",
                    goodQuantities: 20,
                    badQuantities: 15,
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
            lines: [{ itemId: "1001", goodQuantities: 50 }],
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
                { itemId: "1001", goodQuantities: 2 },
                {
                    itemId: "1002",
                    goodQuantities: 2,
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
                { itemId: "2000", goodQuantities: 2 },
                { itemId: "2001", goodQuantities: 2 },
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
                { itemId: "1001", goodQuantities: 2 },
                { itemId: "1002", goodQuantities: 2 },
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

    it("Deve permitir dar entrada de um artigo em regime de consignação", async () => {
        const item = new Item(ID.fromString("3000"), "Camisa", new Decimal(1000));

        const itemRepository = new InmemItemRepository([item]);
        const itemStockRepository = new ItemStockRepositoryStub();
        const { service } = makeService({ itemRepository, itemStockRepository });

        await itemRepository.saveAll([item]);

        const data = {
            lines: [{ itemId: "3000", goodQuantities: 1, isConsignment: true }],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };

        await service.new(data);

        const itemIds = [ID.fromString("3000")];
        const itemsStock = await itemStockRepository.findAll(itemIds);

        expect(itemsStock.length).toBe(1);
        expect(itemsStock[0].total).toBe(1);
        expect(itemsStock[0].itemStockType).toBe("Consignação");
    });

    it("Deve retornar erro se o artigo em regime de consignação tiver mais de uma quantidade boa", async () => {
        const item = new Item(ID.fromString("3000"), "Camisa", new Decimal(1000));

        const itemRepository = new InmemItemRepository([item]);
        const itemStockRepository = new ItemStockRepositoryStub();
        const { service } = makeService({ itemRepository, itemStockRepository });

        await itemRepository.saveAll([item]);

        const data = {
            lines: [{ itemId: "3000", goodQuantities: 2, isConsignment: true }],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };

        const error = await service.new(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidQuantitiesError);
    });

    it("Deve retornar erro se o artigo em regime de consignação tiver mais de uma quantidade em mau estado", async () => {
        const item = new Item(ID.fromString("3000"), "Camisa", new Decimal(1000));

        const itemRepository = new InmemItemRepository([item]);
        const itemStockRepository = new ItemStockRepositoryStub();
        const { service } = makeService({ itemRepository, itemStockRepository });

        await itemRepository.saveAll([item]);

        const data = {
            lines: [{ itemId: "3000", goodQuantities: 1, badQuantities: 2, isConsignment: true }],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };

        const error = await service.new(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidQuantitiesError);
    });

    it("Deve retornar erro se o total de quantidades boas e más do artigo em regime de consignação for superior a 1", async () => {
        const item = new Item(ID.fromString("3000"), "Camisa", new Decimal(1000));

        const itemRepository = new InmemItemRepository([item]);
        const itemStockRepository = new ItemStockRepositoryStub();
        const { service } = makeService({ itemRepository, itemStockRepository });

        await itemRepository.saveAll([item]);

        const data = {
            lines: [{ itemId: "3000", goodQuantities: 1, badQuantities: 1, isConsignment: true }],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };

        const error = await service.new(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidQuantitiesError);
    });

    it("Ao dar entrada de um artigo em regime de consignação, o seu tipo deve ser 'Consignação' dentro da guia", async () => {
        const item = new Item(ID.fromString("3000"), "Camisa", new Decimal(1000));

        const itemRepository = new InmemItemRepository([item]);
        const itemStockRepository = new ItemStockRepositoryStub();
        const { service, goodsReceiptNoteRepository } = makeService({
            itemRepository,
            itemStockRepository,
        });

        await itemRepository.saveAll([item]);

        const data = {
            lines: [{ itemId: "3000", goodQuantities: 1, isConsignment: true }],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };

        await service.new(data);

        const note = await goodsReceiptNoteRepository.last();

        expect(note.lines.length).toBe(1);
        expect(note.lines[0].itemStockType).toBe("Consignação");
    });

    it("O artigo que não for em regime de consignação, deve ter o tipo de stock vazio dentro da guia", async () => {
        const item = new Item(ID.fromString("3000"), "Camisa", new Decimal(1000));

        const itemRepository = new InmemItemRepository([item]);
        const itemStockRepository = new ItemStockRepositoryStub();
        const { service, goodsReceiptNoteRepository } = makeService({
            itemRepository,
            itemStockRepository,
        });

        await itemRepository.saveAll([item]);

        const data = {
            lines: [{ itemId: "3000", goodQuantities: 1 }],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };

        await service.new(data);

        const note = await goodsReceiptNoteRepository.last();

        expect(note.lines.length).toBe(1);
        expect(note.lines[0].itemStockType).toBe("");
    });

    it("O artigo que não for em regime de consignação, deve ter o tipo de stock vazio no stock do artigo", async () => {
        const item = new Item(ID.fromString("3000"), "Camisa", new Decimal(1000));

        const itemRepository = new InmemItemRepository([item]);
        const itemStockRepository = new ItemStockRepositoryStub();
        const { service } = makeService({
            itemRepository,
            itemStockRepository,
        });

        await itemRepository.saveAll([item]);

        const data = {
            lines: [{ itemId: "3000", goodQuantities: 1 }],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };

        await service.new(data);

        const itemIds = [ID.fromString("3000")];
        const itemsStock = await itemStockRepository.findAll(itemIds);

        expect(itemsStock.length).toBe(1);
        expect(itemsStock[0].itemStockType).toBe("");
    });

    it("Se o artigo for em regime de consignação, deve registar o valor de consignação na guia de entrada", async () => {
        const item = new Item(ID.fromString("3000"), "Camisa", new Decimal(1000));

        const itemRepository = new InmemItemRepository([item]);
        const itemStockRepository = new ItemStockRepositoryStub();
        const { service, goodsReceiptNoteRepository } = makeService({
            itemRepository,
            itemStockRepository,
        });
        await itemRepository.saveAll([item]);

        const data = {
            lines: [
                { itemId: "3000", goodQuantities: 1, isConsignment: true, consignmentValue: 1000 },
            ],
            entryDate: "2024-03-01T16:40:00",
            userId: "1000",
        };

        await service.new(data);

        const note = await goodsReceiptNoteRepository.last();

        expect(note.lines.length).toBe(1);
        expect(note.lines[0].consignmentValue).toBe(1000);
    });
});

describe("GoodsReceiptService - Listar guias de entrada de mercadoria", () => {
    it("Deve listar todas as guias de entrada de mercadoria", async () => {
        const { service } = makeService();
        const data = {
            lines: [
                { itemId: "1001", goodQuantities: 2 },
                { itemId: "1002", goodQuantities: 2 },
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
