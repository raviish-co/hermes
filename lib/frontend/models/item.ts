import type { Condition } from "./condition";

export interface VariationValue {
    variationId: string;
    value: string;
}

export interface ItemModel {
    itemId: string;
    name: string;
    price: string;
    categoryId: string;
    variationsValues?: VariationValue[];
    quantity: number;
    condition?: Condition;
}
