import { ID } from "../../shared/id";
import { Decimal } from "../../shared/decimal";
import type { Condition } from "../catalog/items/item";

export class GoodsIssueNoteLine {
    readonly lineId: ID;
    readonly itemId: ID;
    readonly name: string;
    readonly fulltext: string;
    readonly price: Decimal;
    readonly variationsValues?: Record<string, string>;
    readonly condition?: Condition;
    #goodQuantities: number;
    #badQuantities: number;
    #quantityReturned: number;
    #netTotal: Decimal;

    constructor(
        itemId: ID,
        name: string,
        price: Decimal,
        fulltext: string,
        goodQuantities: number,
        badQuantities?: number,
        condition?: Condition,
        variations?: Record<string, string>,
        quantityReturned?: number
    ) {
        this.lineId = ID.random();
        this.itemId = itemId;
        this.name = name;
        this.variationsValues = variations;
        this.fulltext = fulltext;
        this.price = price;
        this.#goodQuantities = goodQuantities;
        this.#netTotal = new Decimal(0);
        this.#badQuantities = badQuantities ?? 0;
        this.#quantityReturned = quantityReturned ?? 0;
        this.condition = condition;

        this.#calculateTotal();
    }

    returnLine(quantity: number) {
        if (this.isFullyReturned()) return;
        this.#quantityReturned += quantity;
    }

    checkQuantity(quantity: number): boolean {
        return quantity >= 1 && quantity <= this.#range();
    }

    isFullyReturned(): boolean {
        return this.#quantityReturned === this.#goodQuantities;
    }

    #calculateTotal(): void {
        const factor = new Decimal(this.total);
        this.#netTotal = this.price.multiply(factor);
    }

    #range() {
        return this.total - this.#quantityReturned;
    }

    get netTotal(): Decimal {
        return this.#netTotal;
    }

    get goodQuantities(): number {
        return this.#goodQuantities;
    }

    get badQuantities(): number {
        return this.#badQuantities;
    }

    get total(): number {
        return this.goodQuantities + this.badQuantities;
    }

    get quantityReturned(): number {
        return this.#quantityReturned;
    }

    get maxToReturn(): number {
        return this.#range();
    }
}
