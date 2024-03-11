import type { VariationValue } from "../models/variation_value";
import { convertToNumber } from "../helpers/convert_to_number";
import { formatCurrency } from "../helpers/format_currency";
import type { Condition } from "../models/condition";
import type { ItemModel } from "../models/item";
import { formatVariationValues } from "../helpers/format_variation_values";

export class GoodsIssueNoteLine {
    itemId: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
    total: number;
    variationsValues?: VariationValue[];
    condition?: Condition;

    constructor(item: ItemModel, quantity: number) {
        this.itemId = item.itemId;
        this.name = item.name;
        this.quantity = quantity;
        this.price = convertToNumber(item.price);
        this.condition = item.condition;
        this.variationsValues = item.variationsValues;
        this.stock = item.quantity;
        this.total = 0;
    }

    calculateTotal() {
        if (!this.isAvaliableQuantity()) {
            this.total = 0;
            return;
        }

        this.total = this.price * this.quantity;
    }

    updateCondition(status: "Bom" | "Mau", comment?: string) {
        this.condition = { status, comment };
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

    get formattedVariationsValues() {
        return formatVariationValues(this.variationsValues);
    }

    isAvaliableQuantity() {
        return this.quantity <= this.stock;
    }
}
