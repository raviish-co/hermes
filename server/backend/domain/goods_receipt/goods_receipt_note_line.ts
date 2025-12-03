import { Condition } from "../../shared/condition";
import { ID } from "../../shared/id";
import { ItemStockType } from "../warehouse/item_stock_type";

export class GoodsReceiptNoteLine {
    #lineId: ID;
    #itemId: ID;
    #goodQuantities: number;
    #badQuantities?: number;
    condition: Condition;
    #itemStockType?: string;
    #consignmentValue?: number;

    constructor(
        itemId: ID,
        goodQuantities: number,
        badQuantities?: number,
        comments?: string,
        itemStockType?: string,
        consignmentValue?: number
    ) {
        this.#lineId = ID.random();
        this.#itemId = itemId;
        this.#goodQuantities = goodQuantities;
        this.condition = new Condition(comments);
        this.#itemStockType = this.#getItemStockType(itemStockType);
        this.#consignmentValue = consignmentValue ?? 0;

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

    get badQuantities(): number {
        return this.#badQuantities || 0;
    }

    get itemStockType(): string | undefined {
        return this.#itemStockType;
    }

    get consignmentValue(): number | undefined {
        return this.#consignmentValue;
    }

    get total(): number {
        if (!this.#badQuantities) return this.#goodQuantities;
        return this.#goodQuantities + this.#badQuantities;
    }

    #getItemStockType(itemStockType?: string): string | undefined {
        if (itemStockType === ItemStockType.Consignacao) return ItemStockType.Consignacao;
        return "";
    }
}
