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

    static create(itemId: ID): ItemStock {
        return new ItemStock(itemId, 0, 0);
    }

    isOutOfStock(): boolean {
        return this.total === 0;
    }

    increase(goodQuantities: number, badQuantities?: number): void {
        this.#goodQuantities += goodQuantities;

        if (!badQuantities) return;

        this.#badQuantities += badQuantities;
    }

    reduce(goodQuantities: number, badQuantities?: number): void {
        this.#goodQuantities -= goodQuantities;

        if (!badQuantities) return;

        this.#badQuantities -= badQuantities;
    }

    canReduce(goodQuantities: number, badQuantities?: number): boolean {
        const total = goodQuantities + (badQuantities ?? 0);

        if (this.#total < total) return false;

        return true;
    }

    get itemStockId(): ID {
        return this.#itemStockId;
    }

    get itemId(): ID {
        return this.#itemId;
    }

    get total(): number {
        return this.#goodQuantities + this.#badQuantities;
    }

    get goodQuantities(): number {
        return this.#goodQuantities;
    }

    get badQuantities(): number {
        return this.#badQuantities;
    }
}
