export class GoodsReceiptNoteNotFoundError extends Error {
    constructor(cause: string, id: string) {
        super(`${cause}: Goods receipt with id ${id} not found`);
        this.cause = cause;
        this.name = "GoodsReceiptNoteNoteNotDoundError";
    }
}
