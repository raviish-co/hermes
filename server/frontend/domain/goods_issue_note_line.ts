import type { VariationValueModel } from "../models/variation_value";
import { formatCurrency } from "../helpers/format_currency";
import type { ConditionModel } from "../models/condition";
import { NoteLine } from "./note_line";

export class GoodsIssueNoteLine extends NoteLine {
    price: number;
    total: number;

    constructor(
        itemId: string,
        name: string,
        price: number,
        variationsValues?: VariationValueModel[],
        condition?: ConditionModel,
        quantityRequested?: number,
        quantityReturned?: number,
        quantityToReturn?: number
    ) {
        super(itemId, name, variationsValues, condition);

        this.price = price;
        this.total = 0;

        this.quantityRequested = quantityRequested ?? 0;
        this.quantityReturned = quantityReturned ?? 0;
        this.goodQuantities = quantityToReturn ?? 0;
    }

    calculate() {
        this.total = this.price * this.goodQuantities;
    }

    totalIsZero() {
        return this.total === 0;
    }

    get formattedPrice() {
        return formatCurrency(this.price);
    }

    get formattedTotal() {
        return formatCurrency(this.total);
    }
}
