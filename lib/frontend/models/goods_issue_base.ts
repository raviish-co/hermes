import type { Condition } from "./condition";
import type { VariationValue } from "./variation_value";

export interface GoodsIssueBase {
    returnDate: string;
    total: string;
}

export interface GoodsIssueLineBase {
    itemId: string;
    name: string;
    quantity: number;
    variationsValues?: VariationValue[];
    condition?: Condition;
    fullText?: string;
}
