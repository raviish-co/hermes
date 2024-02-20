import type { Condition } from "./condition";

export interface VariationValue {
    variationId: string;
    value: string;
}

export interface GoodsIssueItem {
    itemId: string;
    name: string;
    price: string;
    isUnique: boolean;
    quantity: number;
    stock: number;
    total: string;
    variationsValues?: VariationValue[];
    condition?: Condition;
}
