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
        quantity: number,
        price: number,
        quantityReturned?: number,
        variationsValues?: VariationValueModel[],
        condition?: ConditionModel,
        stock?: number
    ) {
        super(itemId, name, quantity, quantityReturned, variationsValues, condition);
        this.price = price;
        this.stock = stock ?? 0;
        this.total = 0;
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
        return this.total == 0;
    }

    get formattedPrice() {
        return formatCurrency(this.price);
    }

    get formattedTotal() {
        return formatCurrency(this.total);
    }
}
