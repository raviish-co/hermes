import { ID } from "../shared/id";

export class ItemStock {
    readonly stockId: ID;
    #quantity: number;

    constructor(stockId: ID, quantity: number) {
        this.stockId = stockId;
        this.#quantity = quantity;
    }

    verify(quantity: number): boolean {
        return this.#quantity > quantity;
    }

    reduce(quantity: number): void {
        this.#quantity -= quantity;
    }

    getQuantity(): number {
        return this.#quantity;
    }
}
