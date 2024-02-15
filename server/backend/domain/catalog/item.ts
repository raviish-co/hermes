import { Condition } from "../../shared/types";
import { Decimal } from "../../shared/decimal";
import { ItemStock } from "./item_stock";
import { Variation } from "./variation";
import { ID } from "../../shared/id";

type Section = {
    name: string;
    department?: string;
};

type Options = {
    itemId: string;
    name: string;
    price: string;
    unique?: boolean;
    categoryId: ID;
    condition: ItemCondition;
    stock: ItemStock;
    section?: Section;
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
    readonly name: string;
    readonly categoryId: ID;
    readonly #stock: ItemStock;
    #condition: ItemCondition;
    price: Decimal;
    section?: Section;
    unique?: boolean;
    variations?: Variation[];
    fulltext: string = "";

    private constructor(
        itemId: ID,
        name: string,
        price: Decimal,
        categoryId: ID,
        condition: ItemCondition,
        stockItem: ItemStock,
        variations?: Variation[]
    ) {
        this.itemId = itemId;
        this.name = name;
        this.price = price;
        this.categoryId = categoryId;
        this.#condition = condition;
        this.#stock = stockItem;
        this.variations = variations;
    }

    static create(options: Options): Item {
        const { itemId, name, price, unique, categoryId, condition, stock, section, variations } =
            options;

        const newID = ID.New(itemId);

        const priceDecimal = Decimal.fromString(price);

        const item = new Item(newID, name, priceDecimal, categoryId, condition, stock, variations);

        if (variations) {
            item.variations = variations;
            const variationsNames = variations.map((v) => v.getFullTextName());
            item.fulltext = variationsNames.join(" ").toLowerCase();
        }

        if (unique) {
            item.unique = unique;
        }

        if (section) {
            item.section = section;
        }

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
