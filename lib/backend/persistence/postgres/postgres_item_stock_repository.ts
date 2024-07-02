import type { PrismaClient, Stock } from "@prisma/client";
import { ItemStock } from "../../domain/warehouse/item_stock";
import { ItemStockNotFound } from "../../domain/warehouse/item_stock_not_found";
import type { ItemStockRepository } from "../../domain/warehouse/item_stock_repository";
import { left, right, type Either } from "../../shared/either";
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
        await this.#prisma.stock.createMany({
            data: itemStocks.map((itemStock) => ({
                stockId: itemStock.itemStockId.toString(),
                productId: itemStock.itemId.toString(),
                goodQuantities: itemStock.goodQuantities,
                badQuantities: itemStock.badQuantities,
            })),
        });
    }

    async updateAll(itemStocks: ItemStock[]): Promise<void> {
        itemStocks.forEach(async (itemStock) => {
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

    async findAll(itemIds: ID[]): Promise<Either<ItemStockNotFound, ItemStock[]>> {
        const stocksData = await this.#prisma.stock.findMany({
            where: {
                productId: {
                    in: itemIds.map((id) => id.toString()),
                },
            },
        });

        for (const itemId of itemIds) {
            const itemStock = stocksData.find((stock) => stock.productId === itemId.toString());
            if (!itemStock) return left(new ItemStockNotFound());
        }

        return right(stocksData.map(stockFactory));
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
}
