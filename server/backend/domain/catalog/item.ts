import { Condition } from "../../shared/types";
import { ItemStock } from "./item_stock";
import { Variation } from "./variation";
import { ID } from "../../shared/id";
import { Product } from "./product";

type Options = {
    itemId: string;
    product: Product;
    condition: ItemCondition;
    stock: ItemStock;
    variations?: Variation[];
};

export enum ItemStatus {
    Good = "Bom",
    Bad = "Mau",
}

export type ItemCondition = {
    status: ItemStatus;
    comment?: string;
};

export class Item {
    readonly itemId: ID;
    readonly product: Product;
    readonly #stock: ItemStock;
    #condition: ItemCondition;
    variations?: Variation[];
    fulltext: string = "";

    private constructor(
        itemId: ID,
        product: Product,
        condition: ItemCondition,
        stockItem: ItemStock,
        variations?: Variation[]
    ) {
        this.itemId = itemId;
        this.product = product;
        this.#condition = condition;
        this.#stock = stockItem;
        this.variations = variations;
    }

    static create(options: Options): Item {
        const { itemId, product, condition, stock, variations } = options;

        const newID = ID.New(itemId);

        const item = new Item(newID, product, condition, stock);

        if (!variations) return item;

        item.variations = variations;

        const variationsNames = variations.map((v) => v.getFullTextName());

        item.fulltext = variationsNames.join(" ").toLowerCase();

        return item;
    }

    updateCondition(condition: Condition): void {
        const { status, comment } = condition;
        if (ItemStatus.Good == status) {
            this.#condition = { status: ItemStatus.Good };
            return;
        }
        this.#condition = { status: ItemStatus.Bad, comment };
    }

    canBeReducedStock(quantity: number): boolean {
        return this.#stock.verify(quantity);
    }

    reduceStock(quantity: number): void {
        this.#stock.reduce(quantity);
    }

    getCondition(): ItemCondition {
        return this.#condition;
    }

    getStock(): ItemStock {
        return this.#stock;
    }
}
