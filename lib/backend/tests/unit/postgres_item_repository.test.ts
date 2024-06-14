import { PrismaClient } from "@prisma/client";
import { describe, expect, it, vi } from "vitest";
import { Item } from "../../domain/catalog/items/item";
import { PostgresItemRepository } from "../../persistense/postgres/postgres_item_repository";
import { Decimal } from "../../shared/decimal";
import { ID } from "../../shared/id";

describe("PostgresItemRepository - save", () => {
    it("Deve salvar um artigo no repositorio", async () => {
        const item = new Item(ID.random(), "Artigo 2", new Decimal(10));
        const itemRepository = new PostgresItemRepository(prisma as PrismaClient);
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
        const itemRepository = new PostgresItemRepository(prisma as PrismaClient);
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
        const itemRepository = new PostgresItemRepository(prisma as PrismaClient);
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
        const itemRepository = new PostgresItemRepository(prisma as PrismaClient);
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
        const itemRepository = new PostgresItemRepository(prisma as PrismaClient);
        const item = new Item(
            ID.fromString("1"),
            "Artigo 1",
            new Decimal(10),
            ID.random(),
            ID.random(),
            { Cor: "Azul" }
        );

        await itemRepository.save(item);

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            data: Object.entries(item.variations ?? {}).map(([name, value]) => ({
                name,
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
        const itemRepository = new PostgresItemRepository(prisma as PrismaClient);

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
        const itemRepository = new PostgresItemRepository(prisma as PrismaClient);

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
    it("Deve retornar todos os artigos", async () => {
        const prisma = { product: { findMany: async (_args: object) => _products } };
        const itemRepository = new PostgresItemRepository(prisma as PrismaClient);
        const spy = vi.spyOn(prisma.product, "findMany");

        const items = await itemRepository.getAll();

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            include: { variations: true },
        });

        expect(items.length).toEqual(2);
        expect(items[0].itemId.toString()).toEqual("1");
        expect(items[0].name).toEqual("Artigo 1");
        expect(items[0].price.value).toEqual(10);

        expect(items[1].categoryId?.toString()).toEqual("1");
        expect(items[1].sectionId?.toString()).toEqual("1");
        expect(items[1].tags).toEqual(["tag1", "tag2"]);
    });
});

const prisma = {
    product: { create: async (_args: object) => ({}) },
    productVariations: { createMany: async (_args: object) => ({}) },
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
    },
];
