import type { Condition } from "./condition";
import type { VariationValue } from "./variation_value";

export interface ItemModel {
    itemId: string;
    name: string;
    price: string;
    categoryId: string;
    variationsValues?: VariationValue[];
    quantity: number;
    condition?: Condition;
}
