import { formatVariationValues } from "../helpers/format_variation_values";
import type { VariationValueModel } from "../models/variation_value";
import type { ConditionModel } from "../models/condition";

export class NoteLine {
    itemId: string;
    name: string;
    quantity: number = 0;
    quantityReturned: number = 0;
    quantityRequested: number = 0;
    variationValues: VariationValueModel[];
    condition: ConditionModel;

    constructor(
        itemId: string,
        name: string,
        variationValues: VariationValueModel[],
        condition: ConditionModel
    ) {
        this.itemId = itemId;
        this.name = name;
        this.variationValues = variationValues;
        this.condition = condition;

        if (this.isFullyReturned()) {
            this.changeQuantity(0);
        }
    }

    changeQuantity(quantity: number) {
        this.quantity = quantity;
    }

    updateCondition(status: "Bom" | "Mau", comment?: string) {
        this.condition = { status, comment };
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
