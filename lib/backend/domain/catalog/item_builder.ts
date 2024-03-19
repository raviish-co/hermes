import { left, right, type Either } from "../../shared/either";
import { type Condition, Status, Item } from "./item";
import { Decimal } from "../../shared/decimal";

import { ItemStock } from "./item_stock";
import { ID } from "../../shared/id";

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

    withItemId(itemId: string): ItemBuilder {
        this.#itemId = ID.fromString(itemId);
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

    withVariation(variationId: ID, value: string): ItemBuilder {
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
