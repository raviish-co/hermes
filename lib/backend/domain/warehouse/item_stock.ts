export class ItemStock {
    #total: number;

    constructor(quantity: number) {
        this.#total = quantity;
    }

    isOutOfStock(): boolean {
        return this.#total === 0;
    }

    get total(): number {
        return this.#total;
    }
}
