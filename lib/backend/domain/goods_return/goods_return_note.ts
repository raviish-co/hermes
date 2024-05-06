import type { GoodsReturnNoteLine } from "./goods_return_note_line";
import { Decimal } from "../../shared/decimal";
import { ID } from "../../shared/id";

export class GoodsReturnNote {
    readonly noteId: ID;
    readonly goodsIssueNoteId: ID;
    readonly lines: GoodsReturnNoteLine[];
    readonly securityDepositWithheld: Decimal;
    readonly issuedAt: Date;

    constructor(
        goodsReturnNoteId: ID,
        goodsIssueNoteId: ID,
        returnLines: GoodsReturnNoteLine[],
        securityDepositWithheld: number
    ) {
        this.goodsIssueNoteId = goodsIssueNoteId;
        this.noteId = goodsReturnNoteId;
        this.lines = returnLines;
        this.securityDepositWithheld = new Decimal(securityDepositWithheld);
        this.issuedAt = new Date();
    }
}
