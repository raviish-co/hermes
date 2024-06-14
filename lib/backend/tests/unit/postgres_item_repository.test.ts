import { PrismaClient } from "@prisma/client";
import { describe, expect, it, vi } from "vitest";
import { Item } from "../../domain/catalog/items/item";
import { PostgresItemRepository } from "../../persistense/postgres/postgres_item_repository";
import { Decimal } from "../../shared/decimal";
import { ID } from "../../shared/id";

describe("PostgresItemRepository - save", () => {
    it("Deve salvar um artigo no repositorio", async () => {
        const prisma = {
            product: {
                create: async (_args: object) => {
                    return {
                        productId: "1",
                        name: "Artigo 1",
                        price: 10,
                    };
                },
            },
        };

        const itemRepository = new PostgresItemRepository(prisma as PrismaClient);
        const item = new Item(ID.random(), "Artigo 2", new Decimal(10));
        const spy = vi.spyOn(prisma.product, "create");

        await itemRepository.save(item);

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            data: {
                productId: item.itemId.toString(),
                name: item.name,
                price: item.price.value,
            },
        });
    });

    it("Deve salvar um artigo com a sua categoria", async () => {
        const prisma = {
            product: {
                create: async (_args: object) => {
                    return {
                        productId: "1",
                        name: "Artigo 1",
                        price: 10,
                        categoryId: "1",
                    };
                },
            },
        };
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
            },
        });
    });

    it("Deve salvar um artigo com a sua secção", async () => {
        const prisma = {
            product: {
                create: async (_args: object) => {
                    return {
                        productId: "1",
                        name: "Artigo 1",
                        price: 10,
                        sectionId: "1",
                    };
                },
            },
        };
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
            },
        });
    });

    it("Deve salvar um artigo com a sua categoria e secção", async () => {
        const prisma = {
            product: {
                create: async (_args: object) => {
                    return {
                        productId: "1",
                        name: "Artigo 1",
                        price: 10,
                        categoryId: "1",
                        sectionId: "1",
                    };
                },
            },
        };

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
            },
        });
    });

    it("Deve salvar um artigo com as suas variações", async () => {
        const prisma = {
            product: {
                create: async (_args: object) => {
                    return {
                        productId: "1",
                        name: "Artigo 1",
                        price: 10,
                    };
                },
            },
            productVariations: {
                createMany: async (_args: object) => {
                    return [{ name: "Cor", value: "Azul", productId: "1" }];
                },
            },
        };

        const spy = vi.spyOn(prisma.productVariations, "createMany");
        const itemRepository = new PostgresItemRepository(prisma as any);
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
});
