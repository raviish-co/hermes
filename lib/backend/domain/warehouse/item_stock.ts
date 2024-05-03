import { ID } from "../../shared/id";

export class ItemStock {
    #itemStockId: ID;
    #itemId: ID;
    #total: number;
    #goodQuantities: number;
    #badQuantities: number;

    constructor(itemId: ID, goodQuantities: number, badQuantities: number) {
        this.#itemStockId = ID.random();
        this.#itemId = itemId;
        this.#goodQuantities = goodQuantities;
        this.#badQuantities = badQuantities;
        this.#total = goodQuantities + badQuantities;
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

    get goodQuantities(): number {
        return this.#goodQuantities;
    }

    get badQuantities(): number {
        return this.#badQuantities;
    }
}
