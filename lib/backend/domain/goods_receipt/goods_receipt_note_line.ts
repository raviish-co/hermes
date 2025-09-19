import { Condition } from "../../shared/condition";
import { ID } from "../../shared/id";
import { ItemStockStatus } from "../warehouse/item_stock_status";

export class GoodsReceiptNoteLine {
    #lineId: ID;
    #itemId: ID;
    #goodQuantities: number;
    #badQuantities?: number;
    condition: Condition;
    #consignmentPrice: number;
    #ItemStatus: string;

    constructor(
        itemId: ID,
        goodQuantities: number,
        consignmentPrice: number,
        badQuantities?: number,
        comments?: string
    ) {
        this.#lineId = ID.random();
        this.#itemId = itemId;
        this.#goodQuantities = goodQuantities;
        this.condition = new Condition(comments);
        this.#consignmentPrice = consignmentPrice;
        this.#ItemStatus = ItemStockStatus.CONSIGNACAO;

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

    get itemStatus(): string {
        return this.#ItemStatus;
    }

    get total(): number {
        if (!this.#badQuantities) return this.#goodQuantities;
        return this.#goodQuantities + this.#badQuantities;
    }
}
