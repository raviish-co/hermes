import { ItemStock } from "../../domain/warehouse/item_stock";
import type { ItemStockRepository } from "../../domain/warehouse/item_stock_repository";
import { ID } from "../../shared/id";

export class ItemStockRepositoryStub implements ItemStockRepository {
    #data: Record<string, ItemStock> = {};

    constructor() {
        _data.forEach((i) => {
            const itemStock = new ItemStock(i.itemId, i.goodQuantities, i.badQuantities);
            this.#data[itemStock.itemStockId.toString()] = itemStock;
        });
    }

    save(itemStock: ItemStock): Promise<void> {
        this.#data[itemStock.itemStockId.toString()] = itemStock;
        return Promise.resolve(undefined);
    }

    updateAll(itemStocks: ItemStock[]): Promise<void> {
        itemStocks.forEach((i) => {
            this.#data[i.itemStockId.toString()] = i;
        });
        return Promise.resolve(undefined);
    }

    findAll(itemIds: ID[]): Promise<ItemStock[]> {
        const ids = itemIds.map((i) => i.toString());
        const result = this.records.filter((i) => ids.includes(i.itemId.toString()));
        return Promise.resolve(result);
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
        goodQuantities: 10,
        badQuantities: 0,
    },
    {
        itemId: ID.fromString("1002"),
        quantity: 10,
        goodQuantities: 10,
        badQuantities: 0,
    },
    {
        itemId: ID.fromString("1003"),
        quantity: 7,
        goodQuantities: 7,
        badQuantities: 0,
    },
    {
        itemId: ID.fromString("1004"),
        quantity: 7,
        goodQuantities: 7,
        badQuantities: 0,
    },
    {
        itemId: ID.fromString("1005"),
        quantity: 8,
        goodQuantities: 8,
        badQuantities: 0,
    },
    {
        itemId: ID.fromString("1006"),
        quantity: 8,
        goodQuantities: 8,
        badQuantities: 0,
    },
    {
        itemId: ID.fromString("1007"),
        quantity: 10,
        goodQuantities: 10,
        badQuantities: 0,
    },
];
