export class GoodsIssueNoteHasBeenReturned extends Error {
    constructor() {
        super("Goods have already been returned");
    }
}
