import type { Condition } from "./condition";
import type { VariationValue } from "./variation_value";

interface GoodsReturnLineNoteModel {
    returnLineId: string;
    itemId: string;
    name: string;
    quantity: number;
    variationValues: VariationValue[];
    condition: Condition;
}

export interface GoodsReturnNoteModel {
    goodsIssueNoteId: string;
    goodsReturnNoteId: string;
    securityDepositWithHeld: number;
    issuedAt: string;
    lines: GoodsReturnLineNoteModel[];
}
