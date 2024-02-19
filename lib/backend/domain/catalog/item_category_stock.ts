export class ItemCategoryStock {
    #quantity: number;

    constructor(quantity: number) {
        this.#quantity = quantity;
    }

    verify(quantity: number): boolean {
        return this.#quantity >= quantity;
    }

    reduce(quantity: number): void {
        this.#quantity -= quantity;
    }

    update(quantity: number): void {
        this.#quantity = quantity;
    }

    getQuantity(): number {
        return this.#quantity;
    }
}
