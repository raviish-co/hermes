import { ItemStock } from "../../domain/warehouse/item_stock";
import { ItemStockNotFound } from "../../domain/warehouse/item_stock_not_found";
import type { ItemStockRepository } from "../../domain/warehouse/item_stock_repository";
import { left, right, type Either } from "../../shared/either";
import { ID } from "../../shared/id";

export class ItemStockRepositoryStub implements ItemStockRepository {
    #data: Record<string, ItemStock> = {};

    constructor() {
        _data.forEach((i) => {
            const itemStock = new ItemStock(i.itemId, i.goodQuantities, i.badQuantities);
            this.save(itemStock);
        });
    }

    async getAll(): Promise<ItemStock[]> {
        return this.records;
    }

    async save(itemStock: ItemStock): Promise<void> {
        this.#data[itemStock.itemStockId.toString()] = itemStock;
    }

    async saveAll(itemStocks: ItemStock[]): Promise<void> {
        itemStocks.forEach(this.save.bind(this));
    }

    async updateAll(itemStocks: ItemStock[]): Promise<void> {
        itemStocks.forEach(this.save.bind(this));
    }

    async findAll(itemIds: ID[]): Promise<ItemStock[]> {
        const stocks = [];

        for (const i of itemIds) {
            const stock = this.records.find((stock) => stock.itemId.equals(i));

            if (!stock) continue;

            stocks.push(stock);
        }

        return stocks;
    }

    async findAllInStock(): Promise<ItemStock[]> {
        return this.records.filter((i) => !i.isOutOfStock());
    }

    async findAllOutOfStock(): Promise<ItemStock[]> {
        return this.records.filter((i) => i.isOutOfStock());
    }

    get records(): ItemStock[] {
        return Object.values(this.#data);
    }
}

const _data = [
    {
        itemId: ID.fromString("1001"),
        goodQuantities: 10,
        badQuantities: 0,
    },
    {
        itemId: ID.fromString("1002"),
        goodQuantities: 10,
        badQuantities: 0,
    },
    {
        itemId: ID.fromString("1003"),
        goodQuantities: 7,
        badQuantities: 0,
    },
    {
        itemId: ID.fromString("1004"),
        goodQuantities: 7,
        badQuantities: 0,
    },
    {
        itemId: ID.fromString("1005"),
        goodQuantities: 8,
        badQuantities: 0,
    },
    {
        itemId: ID.fromString("1006"),
        goodQuantities: 8,
        badQuantities: 0,
    },
    {
        itemId: ID.fromString("1007"),
        goodQuantities: 10,
        badQuantities: 0,
    },
    {
        itemId: ID.fromString("1008"),
        goodQuantities: 10,
        badQuantities: 5,
    },
    {
        itemId: ID.fromString("1009"),
        goodQuantities: 7,
        badQuantities: 0,
    },
    {
        itemId: ID.fromString("1010"),
        goodQuantities: 7,
        badQuantities: 0,
    },
    {
        itemId: ID.fromString("1011"),
        goodQuantities: 3,
        badQuantities: 3,
    },
    {
        itemId: ID.fromString("1012"),
        goodQuantities: 3,
        badQuantities: 4,
    },
];
