import { GoodsReturnNoteLine } from "./goods_return_note_line";
import { Decimal } from "../../shared/decimal";
import { ID } from "../../shared/id";

export class GoodsReturnNote {
    readonly noteId: ID;
    readonly goodsIssueNoteId: ID;
    readonly lines: GoodsReturnNoteLine[];
    readonly securityDepositWithheld: Decimal;
    readonly issuedAt: Date;

    constructor(
        noteId: ID,
        goodsIssueNoteId: ID,
        lines: GoodsReturnNoteLine[],
        securityDepositWithheld: number,
        issuedAt?: Date
    ) {
        this.noteId = noteId;
        this.goodsIssueNoteId = goodsIssueNoteId;
        this.lines = lines;
        this.securityDepositWithheld = new Decimal(securityDepositWithheld);
        this.issuedAt = issuedAt ?? new Date();
    }
}
