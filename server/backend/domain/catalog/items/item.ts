import { Decimal } from "../../../shared/decimal";
import { ID } from "../../../shared/id";

export class Item {
    readonly itemId: ID;
    readonly categoryId?: ID;
    #name: string;
    #sectionId?: ID;
    #price: Decimal;
    #variationsValues?: Record<string, string>;
    #fulltext: string = "";
    #tags?: string[];

    constructor(
        itemId: ID,
        name: string,
        price: Decimal,
        categoryId?: ID,
        sectionId?: ID,
        variationsValues?: Record<string, string>,
        tags?: string[]
    ) {
        this.itemId = itemId;
        this.categoryId = categoryId;
        this.#name = name;
        this.#sectionId = sectionId;
        this.#price = price;
        this.#variationsValues = variationsValues;
        this.#tags = tags;
        this.#fulltext = this.#buildFullText();
    }

    #buildFullText(): string {
        const tokens = [
            this.#name,
            ...Object.values(this.#variationsValues ?? ""),
            ...(this.#tags ?? ""),
        ];
        return tokens.join(" ").toLowerCase();
    }

    get name(): string {
        return this.#name;
    }

    get price(): Decimal {
        return this.#price;
    }

    get fulltext(): string {
        return this.#fulltext;
    }

    get variations() {
        return this.#variationsValues;
    }

    get sectionId() {
        return this.#sectionId;
    }

    get tags() {
        return this.#tags;
    }
}
