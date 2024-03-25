import type { VariationValueModel } from "../models/variation_value";
import type { ConditionModel } from "../models/condition";
import { formatVariationValues } from "../helpers/format_variation_values";

export abstract class NoteLine {
    itemId: string;
    name: string;
    quantity: number;
    quantityReturned: number;
    quantityRequested: number;
    variationValues?: VariationValueModel[];
    condition?: ConditionModel;

    constructor(
        itemId: string,
        name: string,
        quantity: number,
        quantityReturned?: number,
        variationValues?: VariationValueModel[],
        condition?: ConditionModel
    ) {
        this.itemId = itemId;
        this.name = name;

        this.quantity = quantity;
        this.quantityRequested = quantity;
        this.quantityReturned = quantityReturned ?? 0;

        this.variationValues = variationValues;
        this.condition = condition;
    }

    changeQuantity(quantity: number) {
        this.quantity = quantity;
    }

    updateCondition(status: "Bom" | "Mau", comment?: string) {
        this.condition = { status, comment };
    }

    calculate() {
        this.quantity -= this.quantityReturned;
    }

    isFullyReturned() {
        return this.quantityRequested === this.quantityReturned;
    }

    get maxToReturn(): number {
        return this.quantityRequested - this.quantityReturned;
    }

    get formattedVariationsValues() {
        return formatVariationValues(this.variationValues);
    }
}
