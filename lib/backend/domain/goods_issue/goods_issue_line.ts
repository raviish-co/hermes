import { Decimal } from "../../shared/decimal";
import { ID } from "../../shared/id";

export class GoodsIssueLine {
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
        quantity: number,
        variationsValues: Record<string, string>,
        fulltext: string,
        quantityReturned?: number
    ) {
        this.issueLineId = ID.random();
        this.itemId = itemId;
        this.name = name;
        this.variationsValues = variationsValues;
        this.fulltext = fulltext;
        this.price = price;
        this.#quantity = quantity;
        this.quantityReturned = quantityReturned ?? 0;
        this.#netTotal = Decimal.fromString("0");

        this.#calculateTotal();
    }

    returnLine(quantity: number) {
        if (this.isFullyReturned()) return;
        this.quantityReturned += quantity;
    }

    checkQuantity(quantity: number): boolean {
        return this.#quantity >= quantity;
    }

    isFullyReturned(): boolean {
        return this.quantityReturned === this.#quantity;
    }

    #calculateTotal(): void {
        const factor = Decimal.fromString(this.#quantity.toString());
        this.#netTotal = this.price.multiply(factor);
    }

    get quantityRequested(): number {
        return this.#quantity;
    }

    get total(): Decimal {
        return this.#netTotal;
    }
}
