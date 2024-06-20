import { describe, expect, it, vi } from "vitest";
import { PostgresItemStockRepository } from "../../persistense/postgres/postgres_item_stock_repository";
import type { PrismaClient } from "@prisma/client";
import { ID } from "../../shared/id";
import { ItemStock } from "../../domain/warehouse/item_stock";

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

const prisma = {
    stock: {
        findMany: async (_args: object) => _itemsStock,
        create: async (_args: object) => ({}),
        update: async (_args: object) => ({}),
    },
} as unknown as PrismaClient;

const _itemsStock = [
    {
        stockId: "1",
        itemId: "1",
        goodQuantities: 10,
        badQuantities: 0,
    },
];
