import type { Condition } from "./condition";
import type { Purpose } from "./purpose";
import type { VariationValue } from "./variation_value";

export interface GoodsIssueLine {
    itemId: string;
    name: string;
    quantity: number;
    variationsValues?: VariationValue[];
    condition?: Condition;
}

export interface GoodsIssueNoteModel {
    goodsIssueNoteId: string;
    returnDate: string;
    total: string;
    purpose: Purpose;
    status: string;
    securityDeposit: string;
    lines: GoodsIssueLine[];
}
