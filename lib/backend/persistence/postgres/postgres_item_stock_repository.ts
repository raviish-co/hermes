import type { PrismaClient, Stock } from "@prisma/client";
import { ItemStock } from "../../domain/warehouse/item_stock";
import type { ItemStockRepository } from "../../domain/warehouse/item_stock_repository";
import { ID } from "../../shared/id";

function stockFactory(data: Stock): ItemStock {
    return ItemStock.restore(data.stockId, data.productId, data.goodQuantities, data.badQuantities);
}

export class PostgresItemStockRepository implements ItemStockRepository {
    #prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.#prisma = prisma;
    }

    async getAll(): Promise<ItemStock[]> {
        const stocksData = await this.#prisma.stock.findMany();
        return stocksData.map(stockFactory);
    }

    async save(itemStock: ItemStock): Promise<void> {
        await this.#prisma.stock.create({
            data: {
                stockId: itemStock.itemStockId.toString(),
                productId: itemStock.itemId.toString(),
                goodQuantities: itemStock.goodQuantities,
                badQuantities: itemStock.badQuantities,
            },
        });
    }

    async saveAll(itemStocks: ItemStock[]): Promise<void> {
        const ids = itemStocks.map((itemStock) => itemStock.itemId.toString());
        const records = await this.#prisma.stock.findMany({ where: { productId: { in: ids } } });

        const itemsStockToUpdate: ItemStock[] = [];
        const itemStockToCreate: ItemStock[] = [];

        for (const itemStock of itemStocks) {
            const record = records.find((r) => r.productId === itemStock.itemId.toString());

            if (!record) {
                itemStockToCreate.push(itemStock);
                continue;
            }

            itemsStockToUpdate.push(itemStock);
        }

        this.#updateItemsStock(itemsStockToUpdate);

        await this.#createItemsStock(itemStockToCreate);
    }

    async updateAll(itemStocks: ItemStock[]): Promise<void> {
        this.#updateItemsStock(itemStocks);
    }

    async findAll(itemIds: ID[]): Promise<ItemStock[]> {
        const stocksData = await this.#prisma.stock.findMany({
            where: {
                productId: {
                    in: itemIds.map((id) => id.toString()),
                },
            },
        });

        return stocksData.map(stockFactory);
    }

    async findAllInStock(): Promise<ItemStock[]> {
        const stocksData = await this.#prisma.stock.findMany({
            where: {
                OR: [
                    {
                        goodQuantities: {
                            gt: 0,
                        },
                    },
                    {
                        badQuantities: {
                            gt: 0,
                        },
                    },
                ],
            },
        });
        return stocksData.map(stockFactory);
    }

    async findAllOutOfStock(): Promise<ItemStock[]> {
        const stocksData = await this.#prisma.stock.findMany({
            where: {
                AND: {
                    goodQuantities: {
                        equals: 0,
                    },
                    badQuantities: {
                        equals: 0,
                    },
                },
            },
        });

        return stocksData.map(stockFactory);
    }

    async #createItemsStock(itemsStock: ItemStock[]) {
        if (itemsStock.length === 0) {
            return;
        }

        await this.#prisma.stock.createMany({
            data: itemsStock.map((itemStock) => ({
                stockId: itemStock.itemStockId.toString(),
                productId: itemStock.itemId.toString(),
                goodQuantities: itemStock.goodQuantities,
                badQuantities: itemStock.badQuantities,
            })),
        });
    }

    #updateItemsStock(itemsStock: ItemStock[]) {
        if (itemsStock.length === 0) {
            return;
        }

        itemsStock.forEach(async (itemStock) => {
            await this.#prisma.stock.update({
                where: {
                    stockId: itemStock.itemStockId.toString(),
                },
                data: {
                    goodQuantities: itemStock.goodQuantities,
                    badQuantities: itemStock.badQuantities,
                },
            });
        });
    }
}
