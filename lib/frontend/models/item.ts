import type { ConditionModel } from "./condition";
import type { VariationValueModel } from "./variation_value";

export interface ItemModel {
    itemId: string;
    name: string;
    price: number;
    stock: number;
    categoryId?: string;
    variationsValues?: VariationValueModel[];
    condition?: ConditionModel;
}
