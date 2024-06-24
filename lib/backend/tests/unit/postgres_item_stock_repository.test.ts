import type { PrismaClient } from "@prisma/client";
import { describe, expect, it, vi } from "vitest";
import { ItemStock } from "../../domain/warehouse/item_stock";
import { ItemStockNotFound } from "../../domain/warehouse/item_stock_not_found";
import { PostgresItemStockRepository } from "../../persistense/postgres/postgres_item_stock_repository";
import { ID } from "../../shared/id";

describe("PostgresItemStockRepository - getAll", () => {
    it("Deve encontrar os artigos em stock", async () => {
        const spy = vi.spyOn(prisma.stock, "findMany");
        const stockRepo = new PostgresItemStockRepository(prisma);

        await stockRepo.getAll();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Deve recuperar os artigos em stock", async () => {
        const stockRepo = new PostgresItemStockRepository(prisma);

        const itemsStock = await stockRepo.getAll();

        expect(itemsStock.length).toBe(1);
        expect(itemsStock[0].itemStockId.equals(ID.fromString("1"))).toBeTruthy();
        expect(itemsStock[0].total).toBe(10);
    });
});

describe("PostgresItemStockRepository - save", () => {
    it("Deve salvar o stock do artigo", async () => {
        const spy = vi.spyOn(prisma.stock, "create");
        const stockRepo = new PostgresItemStockRepository(prisma);
        const itemStock = ItemStock.create(ID.fromString("1"));

        await stockRepo.save(itemStock);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({
            data: {
                stockId: itemStock.itemStockId.toString(),
                productId: "1",
                goodQuantities: 0,
                badQuantities: 0,
            },
        });
    });
});

describe("PostgresItemStockRepository - saveAll", () => {
    it("Deve salvar o stock dos artigos", async () => {
        const stockRepo = new PostgresItemStockRepository(prisma);
        const spy = vi.spyOn(prisma.stock, "createMany");

        const itemStocks = [
            ItemStock.create(ID.fromString("1")),
            ItemStock.create(ID.fromString("2")),
        ];

        await stockRepo.saveAll(itemStocks);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({
            data: [
                {
                    stockId: itemStocks[0].itemStockId.toString(),
                    productId: "1",
                    goodQuantities: 0,
                    badQuantities: 0,
                },
                {
                    stockId: itemStocks[1].itemStockId.toString(),
                    productId: "2",
                    goodQuantities: 0,
                    badQuantities: 0,
                },
            ],
        });
    });
});

describe("PostgresItemStockRepository - updateAll", () => {
    it("Deve atualizar o stock dos artigos", async () => {
        const stockRepo = new PostgresItemStockRepository(prisma);
        const spy = vi.spyOn(prisma.stock, "update");
        const itemStocks = [
            ItemStock.create(ID.fromString("1")),
            ItemStock.create(ID.fromString("2")),
        ];

        await stockRepo.updateAll(itemStocks);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(2);
    });
});

describe("PostgresItemStockRepository - findAll", () => {
    it("Deve encontrar os artigos pelo ID", async () => {
        const stockRepo = new PostgresItemStockRepository(prisma);
        const spy = vi.spyOn(prisma.stock, "findMany");

        await stockRepo.findAll([ID.fromString("1")]);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({
            where: {
                productId: { in: ["1"] },
            },
        });
    });

    it("Deve retornar os artigos encontrados", async () => {
        const stockRepo = new PostgresItemStockRepository(prisma);

        const itemsStockOrErr = await stockRepo.findAll([ID.fromString("1")]);

        const itemsStock = <ItemStock[]>itemsStockOrErr.value;

        expect(itemsStock.length).toBe(1);
        expect(itemsStock[0].itemId.equals(ID.fromString("1"))).toBeTruthy();
    });

    it("Deve retornar um erro se não encontrar stock de algum artigo", async () => {
        const stockRepo = new PostgresItemStockRepository(prisma);

        const error = await stockRepo.findAll([ID.fromString("2")]);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(ItemStockNotFound);
    });
});

describe("PostgresItemStockRepository - findAllInStock", () => {
    it("Deve encontrar os artigos que o stock não está esgotado", async () => {
        const stockRepo = new PostgresItemStockRepository(prisma);
        const spy = vi.spyOn(prisma.stock, "findMany");

        await stockRepo.findAllInStock();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({
            where: {
                OR: [{ goodQuantities: { gt: 0 } }, { badQuantities: { gt: 0 } }],
            },
        });
    });

    it("Deve retornar os artigos encontrados", async () => {
        const stockRepo = new PostgresItemStockRepository(prisma);

        const itemsStock = await stockRepo.findAllInStock();

        expect(itemsStock.length).toBe(1);
    });
});

describe("PostgresItemStockRepository - findAllOutOfStock", () => {
    it("Deve encontrar os artigos que o stock está esgotado", async () => {
        const stockRepo = new PostgresItemStockRepository(prisma);
        const spy = vi.spyOn(prisma.stock, "findMany");

        await stockRepo.findAllOutOfStock();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({
            where: {
                AND: {
                    goodQuantities: { equals: 0 },
                    badQuantities: { equals: 0 },
                },
            },
        });
    });

    it("Deve retornar os artigos encontrados", async () => {
        const stockRepo = new PostgresItemStockRepository(prisma);

        const itemsStock = await stockRepo.findAllOutOfStock();

        expect(itemsStock.length).toBe(1);
    });
});

const prisma = {
    stock: {
        findMany: async (_args: object) => _itemsStock,
        create: async (_args: object) => ({}),
        createMany: async (_args: object) => ({}),
        update: async (_args: object) => ({}),
    },
} as unknown as PrismaClient;

const _itemsStock = [
    {
        stockId: "1",
        productId: "1",
        goodQuantities: 10,
        badQuantities: 0,
    },
];
