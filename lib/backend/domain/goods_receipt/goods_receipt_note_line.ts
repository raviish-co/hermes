import { Condition } from "../../shared/condition";
import { ID } from "../../shared/id";
import { ItemsStatus } from "../warehouse/item_stock";

export class GoodsReceiptNoteLine {
    #lineId: ID;
    #itemId: ID;
    #goodQuantities: number;
    #badQuantities?: number;
    condition: Condition;
    #consignmentPrice: number;
    #status: string;

    constructor(
        itemId: ID,
        goodQuantities: number,
        consignmentPrice: number,
        badQuantities?: number,
        comments?: string,
        status?: string
    ) {
        this.#lineId = ID.random();
        this.#itemId = itemId;
        this.#goodQuantities = goodQuantities;
        this.condition = new Condition(comments);
        this.#consignmentPrice = consignmentPrice;
        this.#status = status ?? ItemsStatus.CONSIGNACAO;

        if (!badQuantities) return;

        this.#badQuantities = badQuantities;
    }

    get lineId(): ID {
        return this.#lineId;
    }

    get itemId(): ID {
        return this.#itemId;
    }

    get goodQuantities(): number {
        return this.#goodQuantities;
    }

    get consignmentPrice(): number {
        return this.#consignmentPrice;
    }

    get badQuantities(): number {
        return this.#badQuantities || 0;
    }

    get status(): string {
        return this.#status;
    }

    get total(): number {
        if (!this.#badQuantities) return this.#goodQuantities;
        return this.#goodQuantities + this.#badQuantities;
    }
}
