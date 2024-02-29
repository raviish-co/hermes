import { Decimal } from "../shared/decimal";
import { ID } from "../shared/id";

export class GoodsReturnNote {
    readonly goodsReturnsNoteId: ID;
    readonly goodsIssueNoteId: ID;
    readonly securityDepositWithHeld: Decimal;

    constructor(goodsReturnNoteId: ID, goodsIssueNoteId: ID, securityDepositWithHeld: string) {
        this.goodsReturnsNoteId = goodsReturnNoteId;
        this.goodsIssueNoteId = goodsIssueNoteId;
        this.securityDepositWithHeld = Decimal.fromString(securityDepositWithHeld);
    }
}
