import { Decimal } from "../../shared/decimal";
import { ID } from "../../shared/id";
import type { GoodsReturnLine } from "../goods_issue/goods_return_note_line";

export class GoodsReturnNote {
    readonly goodsReturnNoteId: ID;
    readonly goodsIssueNoteId: ID;
    readonly goodsReturnLines: GoodsReturnLine[];
    readonly securityDepositWithheld: Decimal;
    readonly issuedAt: Date;

    constructor(
        goodsReturnNoteId: ID,
        goodsIssueNoteId: ID,
        returnLines: GoodsReturnLine[],
        securityDepositWithheld: string
    ) {
        this.goodsIssueNoteId = goodsIssueNoteId;
        this.goodsReturnNoteId = goodsReturnNoteId;
        this.goodsReturnLines = returnLines;
        this.securityDepositWithheld = Decimal.fromString(securityDepositWithheld);
        this.issuedAt = new Date();
    }
}
