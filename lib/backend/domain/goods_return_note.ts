import { Decimal } from "../shared/decimal";
import { ID } from "../shared/id";

export class GoodsReturnLine {
    readonly goodsReturnNoteId: ID;
    readonly quantity: number;

    constructor(goodsReturnNoteId: ID, quantity: number) {
        this.goodsReturnNoteId = goodsReturnNoteId;
        this.quantity = quantity;
    }
}

export class GoodsReturnNote {
    readonly goodsReturnsNoteId: ID;
    readonly goodsIssueNoteId: ID;
    readonly securityDepositToBeRetained: Decimal;
    readonly goodsReturnLines: GoodsReturnLine[] = [];

    constructor(
        goodsReturnNoteId: ID,
        goodsIssueNoteId: ID,
        securityDepositToBeRetained: string,
        lines: GoodsReturnLine[]
    ) {
        this.goodsReturnsNoteId = goodsReturnNoteId;
        this.goodsIssueNoteId = goodsIssueNoteId;
        this.securityDepositToBeRetained = Decimal.fromString(securityDepositToBeRetained);
        this.goodsReturnLines = lines;
    }
}
