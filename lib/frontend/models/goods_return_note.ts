import type { ConditionModel } from "./condition";
import type { VariationValueModel } from "./variation_value";

interface GoodsReturnLineNoteModel {
    returnLineId: string;
    itemId: string;
    name: string;
    quantity: number;
    variationValues?: VariationValueModel[];
    condition?: ConditionModel;
}

export interface GoodsReturnNoteModel {
    goodsIssueNoteId: string;
    goodsReturnNoteId: string;
    securityDepositWithHeld: number;
    issuedAt: string;
    lines: GoodsReturnLineNoteModel[];
}
