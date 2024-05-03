import { ID } from "../../shared/id";

export class GoodsReceiptNoteLine {
    #receiptLineId: ID;
    #itemId: ID;
    #goodQuantities: number;
    #badQuantities?: number;

    constructor(itemId: ID, goodQuantities: number, badQuantities?: number) {
        this.#receiptLineId = ID.random();
        this.#itemId = itemId;
        this.#goodQuantities = goodQuantities;

        if (!badQuantities) return;

        this.#badQuantities = badQuantities;
    }

    get receiptLineId(): ID {
        return this.#receiptLineId;
    }

    get itemId(): ID {
        return this.#itemId;
    }

    get goodQuantities(): number {
        return this.#goodQuantities;
    }

    get badQuantities(): number {
        return this.#badQuantities || 0;
    }

    get total(): number {
        if (!this.#badQuantities) return this.#goodQuantities;
        return this.#goodQuantities + this.#badQuantities;
    }
}
