import { ItemStock } from "../../domain/warehouse/item_stock";
import type { ItemStockRepository } from "../../domain/warehouse/item_stock_repository";

export class ItemStockRepositoryStub implements ItemStockRepository {
    #data: Record<string, ItemStock> = {};

    constructor() {
        itemStock.forEach((stock) => {
            this.#data[stock.itemId] = new ItemStock(stock.quantity);
        });
    }

    findAllOutOfStock(): Promise<ItemStock[]> {
        const result = this.records.filter((i) => i.isOutOfStock());
        return Promise.resolve(result);
    }

    get records(): ItemStock[] {
        return Object.values(this.#data);
    }
}

const itemStock = [
    {
        itemId: "1",
        quantity: 10,
    },
    {
        itemId: "2",
        quantity: 20,
    },
    {
        itemId: "3",
        quantity: 30,
    },
    {
        itemId: "4",
        quantity: 0,
    },
    {
        itemId: "5",
        quantity: 0,
    },
    {
        itemId: "6",
        quantity: 0,
    },
];
