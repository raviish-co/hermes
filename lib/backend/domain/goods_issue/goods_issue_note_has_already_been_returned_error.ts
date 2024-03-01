export class GoodsIssueNoteHasAlreadyBeenReturned extends Error {
    constructor(goodsIssueNoteId: string) {
        super(`Goods issue note ${goodsIssueNoteId} has already been returned`);
    }
}
