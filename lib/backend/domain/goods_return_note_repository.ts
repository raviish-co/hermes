import { GoodsReturnNote } from "./goods_return_note";

export interface GoodsReturnNoteRepository {
    save(note: GoodsReturnNote): Promise<void>;
    last(): Promise<GoodsReturnNote>;
}
