import type { VariationValueModel } from "../models/variation_value";
import { formatCurrency } from "../helpers/format_currency";
import type { ConditionModel } from "../models/condition";
import { NoteLine } from "./note_line";

export class GoodsIssueNoteLine extends NoteLine {
    price: number;
    stock: number;
    total: number;

    constructor(
        itemId: string,
        name: string,
        price: number,
        variationsValues: VariationValueModel[],
        condition: ConditionModel,
        stock?: number,
        quantityRequested?: number,
        quantityReturned?: number,
        quantityToReturn?: number
    ) {
        super(itemId, name, variationsValues, condition);

        this.price = price;
        this.total = 0;

        this.quantityRequested = quantityRequested ?? 0;
        this.quantityReturned = quantityReturned ?? 0;
        this.quantity = quantityToReturn ?? 0;

        this.stock = stock ?? 0;
    }

    calculate() {
        if (!this.isAvaliableQuantity()) {
            this.total = 0;
            return;
        }

        this.total = this.price * this.quantity;
    }

    isAvaliableQuantity() {
        return this.quantity <= this.stock;
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
