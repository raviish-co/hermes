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

    updateAll(itemStocks: ItemStock[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

    findAll(itemIds: ID[]): Promise<ItemStock[]> {
        throw new Error("Method not implemented.");
    }

    findAllInStock(): Promise<ItemStock[]> {
        throw new Error("Method not implemented.");
    }

    findAllOutOfStock(): Promise<ItemStock[]> {
        throw new Error("Method not implemented.");
    }
}
