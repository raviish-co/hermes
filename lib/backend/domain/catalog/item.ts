import { ItemStock } from "./item_stock";

import { Decimal } from "../../shared/decimal";
import { ID } from "../../shared/id";
import { left, right, type Either } from "../../shared/either";

type Variation = {
    variationId: string;
    value: string;
};

export type Condition = {
    status: string;
    comment?: string;
};

export enum Status {
    Good = "Bom",
    Bad = "Mau",
}

export class Item {
    readonly itemId: ID;
    readonly categoryId: ID;
    #name: string;
    #sectionId: ID;
    #price: Decimal;
    #variationsValues: Record<string, string>;
    #stock: ItemStock;
    #condition: Condition;
    #fulltext: string = "";

    constructor(
        itemId: ID,
        categoryId: ID,
        name: string,
        sectionId: ID,
        price: Decimal,
        variationsValues: Record<string, string>,
        stock: ItemStock,
        condition: Condition
    ) {
        this.itemId = itemId;
        this.categoryId = categoryId;
        this.#name = name;
        this.#sectionId = sectionId;
        this.#price = price;
        this.#variationsValues = variationsValues;
        this.#stock = stock;
        this.#condition = condition;
        this.#fulltext = this.#buildFullText();
    }

    #buildFullText(): string {
        const tokens = [this.#name, ...Object.values(this.#variationsValues)];
        return tokens.join(" ").toLowerCase();
    }

    updateCondition(condition: Condition): void {
        const { status, comment } = condition;
        if (Status.Good == status) {
            this.#condition = { status: Status.Good };
            return;
        }
        this.#condition = { status: Status.Bad, comment };
    }

    canBeReducedStock(quantity: number): boolean {
        return this.#stock.verify(quantity);
    }

    reduceStock(quantity: number): void {
        this.#stock = new ItemStock(this.#stock.quantity - quantity);
    }

    getCondition(): Condition {
        return this.#condition;
    }

    getStock(): ItemStock {
        return this.#stock;
    }
    get name(): string {
        return this.#name;
    }
}

export class ItemBuilder {
    #itemId: ID;
    #categoryId?: ID;
    #name?: string;
    #sectionId?: ID;
    #price?: Decimal;
    #variationsValues: Record<string, string>;
    #stock: ItemStock;
    #condition: Condition;

    constructor() {
        this.#itemId = ID.random();
        this.#condition = { status: Status.Good };
        this.#stock = new ItemStock(0);
        this.#variationsValues = {};
    }

    withItemId(itemId: ID): ItemBuilder {
        this.#itemId = itemId;
        return this;
    }

    withCategoryId(categoryId: ID): ItemBuilder {
        this.#categoryId = categoryId;
        return this;
    }

    withName(name: string): ItemBuilder {
        this.#name = name;
        return this;
    }

    withSectionId(sectionId: ID): ItemBuilder {
        this.#sectionId = sectionId;
        return this;
    }

    withPrice(price: Decimal): ItemBuilder {
        this.#price = price;
        return this;
    }

    withVariationsValues(variationsValues: Record<string, string>): ItemBuilder {
        this.#variationsValues = variationsValues;
        return this;
    }

    withVarition(variationId: ID, value: string): ItemBuilder {
        this.#variationsValues = {
            ...this.#variationsValues,
            [variationId.toString()]: value,
        };

        return this;
    }

    withStock(quantity: number): ItemBuilder {
        this.#stock = new ItemStock(quantity);
        return this;
    }

    withCondition(condition: Condition): ItemBuilder {
        this.#condition = condition;
        return this;
    }

    withGoodCondition(): ItemBuilder {
        this.#condition = { status: Status.Good };
        return this;
    }

    withBadCondition(comment: string): ItemBuilder {
        this.#condition = { status: Status.Bad, comment };
        return this;
    }

    build(): Either<Error, Item> {
        if (!this.#categoryId) {
            return left(new Error("Category Id is required"));
        }

        if (!this.#name) {
            return left(new Error("Name is required"));
        }

        if (!this.#sectionId) {
            return left(new Error("Section Id is required"));
        }

        if (!this.#price) {
            return left(new Error("Price is required"));
        }

        return right(
            new Item(
                this.#itemId,
                this.#categoryId,
                this.#name,
                this.#sectionId,
                this.#price,
                this.#variationsValues,
                this.#stock,
                this.#condition
            )
        );
    }
}
