import { ItemStock } from "../../domain/warehouse/item_stock";
import type { ItemStockRepository } from "../../domain/warehouse/item_stock_repository";
import { ID } from "../../shared/id";

export class ItemStockRepositoryStub implements ItemStockRepository {
    #data: Record<string, ItemStock> = {};

    constructor() {
        _data.forEach((i) => {
            const itemStock = new ItemStock(i.itemId, i.quantity);
            this.#data[itemStock.itemStockId.toString()] = itemStock;
        });
    }

    save(itemStock: ItemStock): Promise<void> {
        this.#data[itemStock.itemStockId.toString()] = itemStock;
        return Promise.resolve(undefined);
    }

    findAllInStock(): Promise<ItemStock[]> {
        const result = this.records.filter((i) => !i.isOutOfStock());
        return Promise.resolve(result);
    }

    findAllOutOfStock(): Promise<ItemStock[]> {
        const result = this.records.filter((i) => i.isOutOfStock());
        return Promise.resolve(result);
    }

    get records(): ItemStock[] {
        return Object.values(this.#data);
    }
}

const _data = [
    {
        itemId: ID.fromString("1001"),
        quantity: 10,
    },
    {
        itemId: ID.fromString("1002"),
        quantity: 10,
    },
    {
        itemId: ID.fromString("1003"),
        quantity: 7,
    },
    {
        itemId: ID.fromString("1004"),
        quantity: 7,
    },
    {
        itemId: ID.fromString("1005"),
        quantity: 8,
    },
    {
        itemId: ID.fromString("1006"),
        quantity: 8,
    },
    {
        itemId: ID.fromString("1007"),
        quantity: 10,
    },
];
