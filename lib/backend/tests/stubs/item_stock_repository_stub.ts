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
];
