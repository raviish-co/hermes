import { ID } from "../../shared/id";

export class ItemStock {
    #itemStockId: ID;
    #itemId: ID;
    #total: number;

    constructor(itemId: ID, quantity: number) {
        this.#itemStockId = ID.random();
        this.#itemId = itemId;
        this.#total = quantity;
    }

    isOutOfStock(): boolean {
        return this.#total === 0;
    }

    get itemStockId(): ID {
        return this.#itemStockId;
    }

    get itemId(): ID {
        return this.#itemId;
    }

    get total(): number {
        return this.#total;
    }
}
