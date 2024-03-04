import { Decimal } from "../shared/decimal";
import { ID } from "../shared/id";

export class GoodsReturnNote {
    readonly goodsReturnsNoteId: ID;
    readonly goodsIssueNoteId: ID;
    readonly securityDepositToBeRetained: Decimal;

    constructor(goodsReturnNoteId: ID, goodsIssueNoteId: ID, securityDepositToBeRetained: string) {
        this.goodsReturnsNoteId = goodsReturnNoteId;
        this.goodsIssueNoteId = goodsIssueNoteId;
        this.securityDepositToBeRetained = Decimal.fromString(securityDepositToBeRetained);
    }
}
