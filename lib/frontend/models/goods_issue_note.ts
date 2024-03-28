import type { VariationValueModel } from "./variation_value";
import type { ConditionModel } from "./condition";
import type { PurposeModel } from "./purpose";

export interface GoodsIssueNoteLineModel {
    itemId: string;
    name: string;
    price: number;
    quantityRequested: number;
    quantityReturned: number;
    quantityToReturn: number;
    variationValues?: VariationValueModel[];
    condition?: ConditionModel;
}

export interface GoodsIssueNoteModel {
    goodsIssueNoteId: string;
    purpose: PurposeModel;
    status: string;
    returnDate: string;
    total: number;
    securityDeposit: number;
    lines: GoodsIssueNoteLineModel[];
}
