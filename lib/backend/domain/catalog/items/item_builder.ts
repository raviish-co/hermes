import { Decimal } from "../../../shared/decimal";
import { left, right, type Either } from "../../../shared/either";
import { ID } from "../../../shared/id";
import { Item } from "./item";

export class ItemBuilder {
    #itemId: ID;
    #categoryId?: ID;
    #name?: string;
    #sectionId?: ID;
    #price?: Decimal;
    #variationsValues: Record<string, string>;
    #tags?: string[];

    constructor() {
        this.#itemId = ID.random();
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
                this.#categoryId,
                this.#sectionId,
                this.#variationsValues,
                this.#tags
            )
        );
    }
}
