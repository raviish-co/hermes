import type { Condition } from "./condition";
import type { PurposeModel } from "./purpose";
import type { VariationValue } from "./variation_value";

export interface GoodsIssueNoteLineModel {
    itemId: string;
    name: string;
    quantity: number;
    price: number;
    quantityReturned: number;
    variationValues?: VariationValue[];
    condition?: Condition;
}

export interface GoodsIssueNoteModel {
    goodsIssueNoteId: string;
    returnDate: string;
    total: number;
    purpose: PurposeModel;
    status: string;
    securityDeposit: number;
    lines: GoodsIssueNoteLineModel[];
}
