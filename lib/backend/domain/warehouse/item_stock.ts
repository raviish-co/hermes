export class ItemStock {
    #quantity: number;

    constructor(quantity: number) {
        this.#quantity = quantity;
    }

    isOutOfStock(): boolean {
        return this.#quantity === 0;
    }
}
