import type { Either } from "../../shared/either";
import { ID } from "../../shared/id";
import { GoodsReturnNote } from "./goods_return_note";
import { GoodsReturnNoteNotFound } from "./goods_return_note_not_found_error";

export interface GoodsReturnNoteRepository {
    getById(id: ID): Promise<Either<GoodsReturnNoteNotFound, GoodsReturnNote>>;
    getAll(): Promise<GoodsReturnNote[]>;
    save(note: GoodsReturnNote): Promise<void>;
}
