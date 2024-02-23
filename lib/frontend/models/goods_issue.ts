import type { PurposeSpecification } from "./purpose_specification";
import type { Condition } from "./condition";

export interface VariationValue {
    variationId: string;
    value: string;
}

export interface GoodsIssueLine {
    itemId: string;
    name: string;
    price: string;
    quantity: number;
    stock: number;
    total: string;
    variationsValues?: VariationValue[];
    condition?: Condition;
}

export interface GoodsIssueModel {
    total: string;
    returnDate: string;
    purposeSpecification: PurposeSpecification;
    lines: GoodsIssueLine[];
}
