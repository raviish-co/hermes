import { ID } from "../../shared/id";
import { GoodsReturnNote } from "./goods_return_note";

export interface GoodsReturnNoteRepository {
    getById(id: ID): Promise<GoodsReturnNote>;
    getAll(): Promise<GoodsReturnNote[]>;
    save(note: GoodsReturnNote): Promise<void>;
}
