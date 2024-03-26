import { ID } from "../../shared/id";
import { Decimal } from "../../shared/decimal";

export class GoodsIssueNoteLine {
    readonly issueLineId: ID;
    readonly itemId: ID;
    readonly name: string;
    readonly fulltext: string;
    readonly price: Decimal;
    readonly #quantity: number;
    readonly variationsValues: Record<string, string>;
    quantityReturned: number;
    #netTotal: Decimal;

    constructor(
        itemId: ID,
        name: string,
        price: Decimal,
        variations: Record<string, string>,
        fulltext: string,
        quantity: number,
        quantityReturned?: number
    ) {
        this.issueLineId = ID.random();
        this.itemId = itemId;
        this.name = name;
        this.variationsValues = variations;
        this.fulltext = fulltext;
        this.price = price;
        this.#quantity = quantity;
        this.quantityReturned = quantityReturned || 0;
        this.#netTotal = new Decimal(0);

        this.#calculateTotal();
    }

    returnLine(quantity: number) {
        if (this.isFullyReturned()) return;
        this.quantityReturned += quantity;
    }

    checkQuantity(quantity: number): boolean {
        return quantity >= 1 && quantity <= this.#range();
    }

    isFullyReturned(): boolean {
        return this.quantityReturned === this.#quantity;
    }

    #calculateTotal(): void {
        const factor = new Decimal(this.#quantity);
        this.#netTotal = this.price.multiply(factor);
    }

    #range() {
        return this.quantityRequested - this.quantityReturned;
    }

    get quantityRequested(): number {
        return this.#quantity;
    }

    get total(): Decimal {
        return this.#netTotal;
    }

    get maxToReturn(): number {
        return this.#range();
    }
}
