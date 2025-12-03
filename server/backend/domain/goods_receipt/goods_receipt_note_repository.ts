import type { Either } from "../../shared/either";
import type { ID } from "../../shared/id";
import type { Pagination, PaginatorOptions } from "../../shared/pagination";
import { GoodsReceiptNote } from "./goods_receipt_note";
import type { GoodsReceiptNoteNotFoundError } from "./goods_receipt_note_not_found_error";

export interface GoodsReceiptNoteRepository {
    getAll(opts?: PaginatorOptions): Promise<Pagination<GoodsReceiptNote>>;
    save(note: GoodsReceiptNote): Promise<void>;
    getById(noteId: ID): Promise<Either<GoodsReceiptNoteNotFoundError, GoodsReceiptNote>>;
    last(): Promise<GoodsReceiptNote>;
}
