import { left, right, type Either } from "../../../shared/either";
import { type Condition, Status, Item } from "./item";
import { Decimal } from "../../../shared/decimal";

import { ItemStock } from "./item_stock";
import { ID } from "../../../shared/id";

export class ItemBuilder {
    #itemId: ID;
    #categoryId?: ID;
    #name?: string;
    #sectionId?: ID;
    #price?: Decimal;
    #variationsValues: Record<string, string>;
    #stock: ItemStock;
    #condition: Condition;
    #tags?: string[];

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

    withCategoryId(categoryId?: string): ItemBuilder {
        if (!categoryId) return this;
        this.#categoryId = ID.fromString(categoryId);
        return this;
    }

    withName(name: string): ItemBuilder {
        this.#name = name;
        return this;
    }

    withSectionId(sectionId?: string): ItemBuilder {
        if (!sectionId) return this;

        this.#sectionId = ID.fromString(sectionId);
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

    withCondition(comment?: string): ItemBuilder {
        this.withGoodCondition();

        if (!comment) return this;

        this.withBadCondition(comment);
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

    withTags(tags?: string[]): ItemBuilder {
        this.#tags = tags;
        return this;
    }

    build(): Either<Error, Item> {
        if (!this.#itemId) {
            return left(new Error("Item ID is required"));
        }

        if (!this.#name) {
            return left(new Error("Name is required"));
        }

        if (!this.#price) {
            return left(new Error("Price is required"));
        }

        return right(
            new Item(
                this.#itemId,
                this.#name,
                this.#price,
                this.#stock,
                this.#condition,
                this.#categoryId,
                this.#sectionId,
                this.#variationsValues,
                this.#tags
            )
        );
    }
}
