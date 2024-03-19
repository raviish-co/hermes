import { Decimal } from "../../shared/decimal";
import { ID } from "../../shared/id";
import type { GoodsReturnNoteLine } from "./goods_return_note_line";

export class GoodsReturnNote {
    readonly goodsReturnNoteId: ID;
    readonly goodsIssueNoteId: ID;
    readonly goodsReturnLines: GoodsReturnNoteLine[];
    readonly securityDepositWithheld: Decimal;
    readonly issuedAt: Date;

    constructor(
        goodsReturnNoteId: ID,
        goodsIssueNoteId: ID,
        returnLines: GoodsReturnNoteLine[],
        securityDepositWithheld: string
    ) {
        this.goodsIssueNoteId = goodsIssueNoteId;
        this.goodsReturnNoteId = goodsReturnNoteId;
        this.goodsReturnLines = returnLines;
        this.securityDepositWithheld = Decimal.fromString(securityDepositWithheld);
        this.issuedAt = new Date();
    }
}
