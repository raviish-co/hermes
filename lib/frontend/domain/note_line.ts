import { formatVariationValues } from "../helpers/format_variation_values";
import type { VariationValueModel } from "../models/variation_value";
import type { ConditionModel } from "../models/condition";

export class NoteLine {
    itemId: string;
    name: string;
    goodQuantities: number = 0;
    badQuantities: number = 0;
    goodQuantitiesReturned: number = 0;
    badQuantitiesReturned: number = 0;
    quantityReturned: number = 0;
    quantityRequested: number = 0;
    stock: number = 0;
    variationsValues?: VariationValueModel[];
    condition?: ConditionModel;

    constructor(
        itemId: string,
        name: string,
        variationsValues?: VariationValueModel[],
        condition?: ConditionModel
    ) {
        this.itemId = itemId;
        this.name = name;
        this.variationsValues = variationsValues;
        this.condition = condition;

        if (this.isFullyReturned()) {
            this.changeQuantity(0);
        }
    }

    changeQuantity(quantity: number) {
        this.goodQuantities = quantity;
        this.badQuantities = 0;
    }

    changeBadQuantities(good: number, quantity: number) {
        this.badQuantities = quantity;
        this.goodQuantities = good - quantity;
    }

    changeStock(stock: number) {
        this.stock = stock;
    }

    updateCondition(status: "Bom" | "Mau", comment?: string) {
        this.condition = { status, comment };
    }

    updateQuantitiesToReturn(good: number, bad: number) {
        this.goodQuantitiesReturned = good;
        this.badQuantitiesReturned = bad;
    }

    isFullyReturned() {
        return this.quantityRequested === this.quantityReturned;
    }

    get quantity() {
        return this.goodQuantities + this.badQuantities;
    }

    get totalToReturn() {
        return this.quantityRequested - this.quantityReturned;
    }

    get maxToReturn(): number {
        return this.goodQuantitiesReturned + this.badQuantitiesReturned;
    }

    get formattedVariationsValues() {
        return formatVariationValues(this.variationsValues);
    }
}
