export class ItemStock {
    #quantity: number;

    constructor(quantity: number) {
        this.#quantity = quantity;
    }

    verify(quantity: number): boolean {
        return this.#quantity >= quantity;
    }

    get quantity(): number {
        return this.#quantity;
    }
}
