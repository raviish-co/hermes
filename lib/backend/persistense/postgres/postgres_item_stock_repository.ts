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

    save(itemStock: ItemStock): Promise<void> {
        throw new Error("Method not implemented.");
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
