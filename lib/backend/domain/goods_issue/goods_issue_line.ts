import { Decimal } from "../../shared/decimal";
import type { ID } from "../../shared/id";

export class GoodsIssueLine {
    readonly itemId: ID;
    readonly quantity: number;
    readonly price: Decimal;
    #netTotal: Decimal;

    constructor(itemId: ID, price: Decimal, quantity: number) {
        this.itemId = itemId;
        this.quantity = quantity;
        this.price = price;
        this.#netTotal = Decimal.fromString("0");

        this.#calculateTotal();
    }

    #calculateTotal(): void {
        const factor = Decimal.fromString(this.quantity.toString());
        this.#netTotal = this.price.multiply(factor);
    }

    get total(): Decimal {
        return this.#netTotal;
    }
}
