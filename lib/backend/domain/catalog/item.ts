import { Decimal } from "../../shared/decimal";
import { ItemStock } from "./item_stock";
import { ID } from "../../shared/id";

export type Condition = {
    status: Status;
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

    updateCondition(status: string, comment?: string): void {
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

    updateStock(quantity: number): void {
        const result = this.#stock.quantity + quantity;
        this.#stock = new ItemStock(result);
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

    get variations(): Record<string, string> {
        return this.#variationsValues;
    }

    get sectionId(): ID {
        return this.#sectionId;
    }
}
