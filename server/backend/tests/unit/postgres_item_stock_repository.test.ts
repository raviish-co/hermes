import type { PrismaClient } from "@prisma/client";
import { describe, expect, it, vi } from "vitest";
import { ItemStock } from "../../domain/warehouse/item_stock";
import { PostgresItemStockRepository } from "../../persistence/postgres/postgres_item_stock_repository";
import { ID } from "../../shared/id";

describe("PostgresItemStockRepository - getAll", () => {
    it("Deve encontrar os artigos em stock", async () => {
        const { prisma, stockRepo } = await createSetup();
        const spy = vi.spyOn(prisma.stock, "findMany");

        await stockRepo.getAll();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Deve recuperar os artigos em stock", async () => {
        const { stockRepo } = await createSetup();

        const itemsStock = await stockRepo.getAll();

        expect(itemsStock.length).toBe(1);
        expect(itemsStock[0].itemStockId.equals(ID.fromString("1"))).toBeTruthy();
        expect(itemsStock[0].total).toBe(10);
    });
});

describe("PostgresItemStockRepository - saveAll", () => {
    it("Deve criar o stock dos artigos caso não existam registos dos artigos no armazém", async () => {
        const prisma = {
            stock: {
                findMany: async (_args: object) => [],
                createMany: async (_args: object) => ({}),
                update: async (_args: object) => ({}),
            },
        } as unknown as PrismaClient;

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
                    consignmentValue: 0,
                    itemStockType: "",
                    totalValueOfOutputs: 0,
                },
                {
                    stockId: itemStocks[1].itemStockId.toString(),
                    productId: "2",
                    goodQuantities: 0,
                    badQuantities: 0,
                    consignmentValue: 0,
                    itemStockType: "",
                    totalValueOfOutputs: 0,
                },
            ],
        });
    });

    it("Deve atualizar o stock dos artigos caso existam registos dos artigos no armazém", async () => {
        const { stockRepo, prisma } = await createSetup();
        const spy = vi.spyOn(prisma.stock, "update");

        const itemStocks = [
            ItemStock.create(ID.fromString("1")),
            ItemStock.create(ID.fromString("2")),
        ];

        await stockRepo.saveAll(itemStocks);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({
            where: {
                stockId: itemStocks[0].itemStockId.toString(),
            },
            data: {
                goodQuantities: 0,
                badQuantities: 0,
                totalValueOfOutputs: 0,
            },
        });
    });

    it("Deve criar os artigos em stock para os artigos que não existem e atualizar os artigos em stock para os que existem", async () => {
        const { prisma, stockRepo } = await createSetup();
        const spyCreate = vi.spyOn(prisma.stock, "createMany");
        const spyUpdate = vi.spyOn(prisma.stock, "update");

        const itemStocks = [
            ItemStock.create(ID.fromString("1")),
            ItemStock.create(ID.fromString("2")),
        ];

        await stockRepo.saveAll(itemStocks);

        expect(spyCreate).toHaveBeenCalled();
        expect(spyCreate).toHaveBeenCalledTimes(1);
        expect(spyUpdate).toHaveBeenCalled();
        expect(spyUpdate).toHaveBeenCalledTimes(1);
    });
});

describe("PostgresItemStockRepository - save", () => {
    it("Deve salvar o artigo em stock", async () => {
        const { stockRepo, prisma } = await createSetup();
        const spy = vi.spyOn(prisma.stock, "upsert");

        const itemStock = ItemStock.create(ID.fromString("1"));

        await stockRepo.save(itemStock);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({
            where: { productId: itemStock.itemId.toString() },
            update: {
                goodQuantities: itemStock.goodQuantities,
                badQuantities: itemStock.badQuantities,
                itemStockType: itemStock.itemStockType,
                totalValueOfOutputs: itemStock.totalValueOfOutputs,
            },
            create: {
                stockId: itemStock.itemStockId.toString(),
                productId: itemStock.itemId.toString(),
                goodQuantities: itemStock.goodQuantities,
                badQuantities: itemStock.badQuantities,
                itemStockType: itemStock.itemStockType,
                consignmentValue: itemStock.consignmentValue,
                totalValueOfOutputs: itemStock.totalValueOfOutputs,
            },
        });
    });
});

describe("PostgresItemStockRepository - findAll", () => {
    it("Deve encontrar os artigos pelo ID", async () => {
        const { stockRepo, prisma } = await createSetup();
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
        const { stockRepo } = await createSetup();

        const itemsStock = await stockRepo.findAll([ID.fromString("1")]);

        expect(itemsStock.length).toBe(1);
        expect(itemsStock[0].itemId.equals(ID.fromString("1"))).toBeTruthy();
    });
});

describe("PostgresItemStockRepository - findAllInStock", () => {
    it("Deve encontrar os artigos que o stock não está esgotado", async () => {
        const { stockRepo, prisma } = await createSetup();
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
        const { stockRepo } = await createSetup();

        const itemsStock = await stockRepo.findAllInStock();

        expect(itemsStock.length).toBe(1);
    });
});

describe("PostgresItemStockRepository - findAllOutOfStock", () => {
    it("Deve encontrar os artigos que o stock está esgotado", async () => {
        const { stockRepo, prisma } = await createSetup();
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
        const { stockRepo } = await createSetup();
        const itemsStock = await stockRepo.findAllOutOfStock();

        expect(itemsStock.length).toBe(1);
    });
});

const createSetup = async () => {
    const prisma = {
        stock: {
            findMany: async (_args: object) => itemsStock,
            createMany: async (_args: object) => ({}),
            update: async (_args: object) => ({}),
        },
    } as unknown as PrismaClient;
    const stockRepo = new PostgresItemStockRepository(prisma);

    const itemsStock = [
        {
            stockId: "1",
            productId: "1",
            goodQuantities: 10,
            badQuantities: 0,
        },
    ];

    return { prisma, stockRepo };
};
