import { Condition } from "../../shared/condition";
import { Decimal } from "../../shared/decimal";
import { ID } from "../../shared/id";
import type { LineOptions } from "./goods_issue_note_options";

export class GoodsIssueNoteLine {
    readonly itemId: ID;
    readonly name: string;
    readonly price: Decimal;
    readonly variationsValues?: Record<string, string>;
    readonly condition?: Condition;
    #lineId: ID;
    #goodQuantities: number;
    #badQuantities: number;
    #goodQuantitiesReturned: number;
    #badQuantitiesReturned: number;
    #netTotal: Decimal;

    constructor(
        itemId: ID,
        name: string,
        price: Decimal,
        goodQuantities: number,
        badQuantities?: number,
        variations?: Record<string, string>,
        comment?: string
    ) {
        this.itemId = itemId;
        this.name = name;
        this.variationsValues = variations;
        this.price = price;
        this.condition = new Condition(comment);
        this.#lineId = ID.random();
        this.#goodQuantities = goodQuantities;
        this.#badQuantities = badQuantities ?? 0;
        this.#goodQuantitiesReturned = 0;
        this.#badQuantitiesReturned = 0;
        this.#netTotal = new Decimal(0);

        this.#calculateTotal();
    }

    static restore(data: LineOptions): GoodsIssueNoteLine {
        const line = new GoodsIssueNoteLine(
            ID.fromString(data.productId),
            data.name,
            new Decimal(data.price),
            data.goodQuantities,
            data.badQuantities,
            JSON.parse(data.variations ?? "{}"),
            data.comments
        );

        line.#lineId = ID.fromString(data.lineId);
        line.#goodQuantitiesReturned = data.goodQuantitiesReturned;
        line.#badQuantitiesReturned = data.badQuantitiesReturned;

        return line;
    }

    returnLine(goodQuantities: number, badQuantities: number = 0): void {
        if (this.isFullyReturned()) return;
        this.#goodQuantitiesReturned += goodQuantities;
        this.#badQuantitiesReturned += badQuantities;
    }

    checkQuantity(goodQuantities: number, badQuantities: number = 0): boolean {
        const goodTotal = this.goodQuantities - this.goodQuantitiesReturned;
        if (this.badQuantities === 0) return goodTotal >= goodQuantities;
        const badTotal = this.badQuantities - this.badQuantitiesReturned;
        return goodTotal >= goodQuantities && badTotal >= badQuantities;
    }

    isFullyReturned(): boolean {
        return this.#calculateQuantitiesReturned() === this.total;
    }

    #calculateTotal(): void {
        const factor = new Decimal(this.total);
        this.#netTotal = this.price.multiply(factor);
    }

    #calculateQuantitiesReturned() {
        return this.goodQuantitiesReturned + this.badQuantitiesReturned;
    }

    #range() {
        return this.total - this.quantityReturned;
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
        return this.#goodQuantitiesReturned + this.#badQuantitiesReturned;
    }

    get lineId(): ID {
        return this.#lineId;
    }

    get maxToReturn(): number {
        return this.#range();
    }

    get goodQuantitiesReturned(): number {
        return this.#goodQuantitiesReturned;
    }

    get badQuantitiesReturned(): number {
        return this.#badQuantitiesReturned;
    }
}
