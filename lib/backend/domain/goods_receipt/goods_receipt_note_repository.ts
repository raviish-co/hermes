import type { Either } from "../../shared/either";
import type { ID } from "../../shared/id";
import { GoodsReceiptNote } from "./goods_receipt_note";
import type { GoodsReceiptNoteNotFoundError } from "./goods_receipt_note_not_found_error";

export interface GoodsReceiptNoteRepository {
    getAll(): Promise<GoodsReceiptNote[]>;
    save(note: GoodsReceiptNote): Promise<void>;
    getById(itemId: ID): Promise<Either<GoodsReceiptNoteNotFoundError, GoodsReceiptNote>>;
    last(): Promise<GoodsReceiptNote>;
}
