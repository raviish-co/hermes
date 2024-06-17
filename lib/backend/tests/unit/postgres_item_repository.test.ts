import { PrismaClient } from "@prisma/client";
import { describe, expect, it, vi } from "vitest";
import { Item } from "../../domain/catalog/items/item";
import { ItemNotFound } from "../../domain/catalog/items/item_not_found_error";
import { PostgresItemRepository } from "../../persistense/postgres/postgres_item_repository";
import { Decimal } from "../../shared/decimal";
import { ID } from "../../shared/id";

describe("PostgresItemRepository - save", () => {
    it("Deve salvar um artigo no repositorio", async () => {
        const item = new Item(ID.random(), "Artigo 2", new Decimal(10));
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);
        const spy = vi.spyOn(prisma.product, "create");

        await itemRepository.save(item);

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            data: {
                productId: item.itemId.toString(),
                name: item.name,
                price: item.price.value,
                fulltext: item.fulltext,
            },
        });
    });

    it("Deve salvar um artigo com a sua categoria", async () => {
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);
        const item = new Item(ID.random(), "Artigo 1", new Decimal(10), ID.fromString("1"));
        const spy = vi.spyOn(prisma.product, "create");

        await itemRepository.save(item);

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            data: {
                productId: item.itemId.toString(),
                name: item.name,
                price: item.price.value,
                categoryId: item.categoryId?.toString(),
                fulltext: item.fulltext,
            },
        });
    });

    it("Deve salvar um artigo com a sua secção", async () => {
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);
        const item = new Item(
            ID.random(),
            "Artigo 1",
            new Decimal(10),
            undefined,
            ID.fromString("1")
        );
        const spy = vi.spyOn(prisma.product, "create");

        await itemRepository.save(item);

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            data: {
                productId: item.itemId.toString(),
                name: item.name,
                price: item.price.value,
                sectionId: item.sectionId?.toString(),
                fulltext: item.fulltext,
            },
        });
    });

    it("Deve salvar um artigo com a sua categoria e secção", async () => {
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);
        const item = new Item(
            ID.random(),
            "Artigo 1",
            new Decimal(10),
            ID.fromString("1"),
            ID.fromString("1")
        );
        const spy = vi.spyOn(prisma.product, "create");

        await itemRepository.save(item);

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            data: {
                productId: item.itemId.toString(),
                name: item.name,
                price: item.price.value,
                categoryId: item.categoryId?.toString(),
                sectionId: item.sectionId?.toString(),
                fulltext: item.fulltext,
            },
        });
    });

    it("Deve salvar um artigo com as suas variações", async () => {
        const spy = vi.spyOn(prisma.productVariations, "createMany");
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);
        const item = new Item(
            ID.fromString("1"),
            "Artigo 1",
            new Decimal(10),
            ID.random(),
            ID.random(),
            { "1": "Cor: Azul" }
        );

        await itemRepository.save(item);

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            data: Object.entries(item.variations ?? {}).map(([variationId, value]) => ({
                variationId,
                value,
                productId: item.itemId.toString(),
            })),
        });
    });

    it("Deve salvar um artigo com as suas tags", async () => {
        const item = new Item(
            ID.random(),
            "Artigo 1",
            new Decimal(10),
            ID.random(),
            ID.random(),
            undefined,
            ["tag1", "tag2"]
        );
        const spy = vi.spyOn(prisma.product, "create");
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);

        await itemRepository.save(item);

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            data: {
                productId: item.itemId.toString(),
                name: item.name,
                price: item.price.value,
                categoryId: item.categoryId?.toString(),
                sectionId: item.sectionId?.toString(),
                tags: item.tags?.join(","),
                fulltext: "artigo 1 tag1 tag2",
            },
        });
    });

    it("Deve salvar um artigo com o fulltext para pesquisa", async () => {
        const item = new Item(
            ID.random(),
            "Artigo 1",
            new Decimal(10),
            ID.random(),
            ID.random(),
            { Cor: "Azul" },
            ["tag1", "tag2"]
        );
        const spy = vi.spyOn(prisma.product, "create");
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);

        await itemRepository.save(item);

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            data: {
                productId: item.itemId.toString(),
                name: item.name,
                price: item.price.value,
                categoryId: item.categoryId?.toString(),
                sectionId: item.sectionId?.toString(),
                tags: item.tags?.join(","),
                fulltext: "artigo 1 azul tag1 tag2",
            },
        });
    });
});

describe("PostgresItemRepository - getAll", () => {
    it("Deve recuperar os artigos no repositório", async () => {
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);
        const spy = vi.spyOn(prisma.product, "findMany");

        await itemRepository.getAll();

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            include: { variations: true },
        });
    });

    it("Deve retornar os artigos encontrados no repositório", async () => {
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);

        const { result: items } = await itemRepository.getAll();

        expect(items.length).toEqual(2);
        expect(items[0].itemId.toString()).toEqual("1");
        expect(items[0].name).toEqual("Artigo 1");
        expect(items[0].price.value).toEqual(10);

        expect(items[1].categoryId?.toString()).toEqual("1");
        expect(items[1].sectionId?.toString()).toEqual("1");
        expect(items[1].tags).toEqual(["tag1", "tag2"]);
    });

    it("Deve retornar os artigos com as suas variações", async () => {
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);

        const { result: items } = await itemRepository.getAll();

        expect(items[0].variations).toEqual({});
        expect(items[1].variations).toEqual({ "1": "Cor: Azul", "2": "Tamanho: M" });
    });
});

describe("PostgresItemRepository - findAll", () => {
    it("Deve encontrar os artigos no repositório", async () => {
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);
        const spy = vi.spyOn(prisma.product, "findMany");

        await itemRepository.findAll([ID.fromString("1"), ID.fromString("2")]);

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            where: {
                productId: { in: ["1", "2"] },
            },
            include: { variations: true },
        });
    });

    it("Deve recuperar os artigos no repositório", async () => {
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);

        const itemsOrErr = await itemRepository.findAll([ID.fromString("1"), ID.fromString("2")]);

        const items = <Item[]>itemsOrErr.value;

        expect(itemsOrErr.isRight()).toBe(true);
        expect(items.length).toEqual(2);
    });

    it("Deve retornar **ItemNotFound** se não encontrar algum artigo", async () => {
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);

        const itemsOrErr = await itemRepository.findAll([
            ID.fromString("1"),
            ID.fromString("2"),
            ID.fromString("3"),
        ]);

        expect(itemsOrErr.isLeft()).toBe(true);
        expect(itemsOrErr.value).toBeInstanceOf(ItemNotFound);
    });
});

describe("PostgresItemRepository - getById", () => {
    it("Deve encontrar o artigo pelo seu ID", async () => {
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);
        const spy = vi.spyOn(prisma.product, "findUnique");

        await itemRepository.getById(ID.fromString("1"));

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            where: {
                productId: "1",
            },
            include: { variations: true },
        });
    });

    it("Deve retornar o artigo encontrado", async () => {
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);

        const itemOrErr = await itemRepository.getById(ID.fromString("1"));

        const item = <Item>itemOrErr.value;

        expect(itemOrErr.isRight()).toBe(true);
        expect(item.itemId.toString()).toEqual("1");
        expect(item.name).toEqual("Artigo 1");
        expect(item.price.value).toEqual(10);
    });

    it("Deve retornar **ItemNotFound** se não encontrar o artigo", async () => {
        const prisma = {
            product: {
                findUnique: async (_args: object) => null,
            },
        };
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);

        const itemOrErr = await itemRepository.getById(ID.fromString("3"));

        expect(itemOrErr.isLeft()).toBe(true);
        expect(itemOrErr.value).toBeInstanceOf(ItemNotFound);
    });
});

describe("PostgresItemRepository - search", () => {
    it("Deve pesquisar os artigos pelo nome, id ou pelo fulltext no repositório", async () => {
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);
        const spy = vi.spyOn(prisma.product, "findMany");

        await itemRepository.search("Artigo 1", { pageToken: 1, perPage: 10 });

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            where: {
                OR: [
                    { productId: { contains: "Artigo 1" } },
                    { name: { contains: "Artigo 1" } },
                    { fulltext: { contains: "Artigo 1" } },
                ],
            },
            include: { variations: true },
            skip: 0,
            take: 10,
        });
    });

    it("Deve pesquisar os artigos pelo nome, id ou pelo fulltext em minúsculas", async () => {
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);
        const spy = vi.spyOn(prisma.product, "findMany");

        await itemRepository.search("artigo 1", { pageToken: 1, perPage: 10 });

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            where: {
                OR: [
                    { productId: { contains: "artigo 1" } },
                    { name: { contains: "artigo 1" } },
                    { fulltext: { contains: "artigo 1" } },
                ],
            },
            include: { variations: true },
            skip: 0,
            take: 10,
        });
    });

    it("Deve retornar o resultado da pesquisa no repositório páginado", async () => {
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);

        const {
            result: items,
            pageToken,
            perPage,
        } = await itemRepository.search("Artigo 1", { pageToken: 1, perPage: 10 });

        expect(items.length).toEqual(2);
        expect(pageToken).toEqual(1);
        expect(perPage).toEqual(10);
    });
});

describe("PostgresItemRepository - update", () => {
    it("Deve actualizar o artigo no repositório", async () => {
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);
        const spy = vi.spyOn(prisma.product, "update");

        await itemRepository.update(_items[0]);

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            where: { productId: _items[0].itemId.toString() },
            data: {
                name: _items[0].name,
                price: _items[0].price.value,
                fulltext: _items[0].fulltext,
            },
        });
    });

    it("Deve actualizar o artigo com categoria e secção", async () => {
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);
        const spy = vi.spyOn(prisma.product, "update");

        await itemRepository.update(_items[1]);

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            where: { productId: _items[1].itemId.toString() },
            data: {
                name: _items[1].name,
                price: _items[1].price.value,
                categoryId: _items[1].categoryId?.toString(),
                sectionId: _items[1].sectionId?.toString(),
                fulltext: _items[1].fulltext,
            },
        });
    });

    it("Deve actualizar os artigos com as suas tags", async () => {
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);
        const spy = vi.spyOn(prisma.product, "update");

        await itemRepository.update(_items[2]);

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            where: { productId: _items[2].itemId.toString() },
            data: {
                name: _items[2].name,
                price: _items[2].price.value,
                categoryId: _items[2].categoryId?.toString(),
                sectionId: _items[2].sectionId?.toString(),
                tags: _items[2].tags?.join(","),
                fulltext: _items[2].fulltext,
            },
        });
    });

    it("Deve actualizar os artigos com as suas variações", async () => {
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);
        const spy = vi.spyOn(prisma.productVariations, "updateMany");

        await itemRepository.update(_items[3]);

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            where: { productId: _items[3].itemId.toString() },
            data: [
                {
                    variationId: "1",
                    value: "Cor: Azul",
                },
            ],
        });
    });

    it("Não deve actualizar as variações se não existirem", async () => {
        const itemRepository = new PostgresItemRepository(prisma as unknown as PrismaClient);
        const spy = vi.spyOn(prisma.productVariations, "updateMany");

        await itemRepository.update(_items[0]);

        expect(spy).not.toBeCalled();
    });
});

const prisma = {
    product: {
        create: async (_args: object) => ({}),
        findMany: async (_args: object) => _products,
        findUnique: async (_args: object) => _products[0],
        update: async (_args: object) => ({}),
    },
    productVariations: {
        createMany: async (_args: object) => ({}),
        updateMany: async (_args: object) => ({}),
    },
};

const _products = [
    {
        productId: "1",
        name: "Artigo 1",
        price: 10,
    },
    {
        productId: "2",
        name: "Artigo 2",
        price: 20,
        categoryId: "1",
        sectionId: "1",
        tags: "tag1,tag2",
        variations: [
            {
                productId: "2",
                variationId: "1",
                value: "Cor: Azul",
            },
            {
                productId: "2",
                variationId: "2",
                value: "Tamanho: M",
            },
        ],
    },
];

const _items = [
    new Item(ID.fromString("1"), "Artigo 1", new Decimal(10), undefined, undefined, {}),
    new Item(
        ID.fromString("2"),
        "Artigo 2",
        new Decimal(30),
        ID.fromString("1"),
        ID.fromString("1")
    ),
    new Item(
        ID.fromString("3"),
        "Artigo 3",
        new Decimal(10),
        ID.fromString("1"),
        ID.fromString("1"),
        undefined,
        ["tag1", "tag2"]
    ),
    new Item(
        ID.fromString("4"),
        "Artigo 4",
        new Decimal(10),
        ID.fromString("1"),
        ID.fromString("1"),
        { "1": "Cor: Azul" },
        ["tag1", "tag2"]
    ),
];
