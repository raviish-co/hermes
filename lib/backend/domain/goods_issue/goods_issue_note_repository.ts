import type { Either } from "../../shared/either";
import { ID } from "../../shared/id";
import { GoodsIssueNote } from "./goods_issue_note";
import { GoodsIssueNoteNotFound } from "./goods_issue_note_not_found_error";

export interface GoodsIssueNoteRepository {
    getById(noteId: ID): Promise<Either<GoodsIssueNoteNotFound, GoodsIssueNote>>;
    getAll(): Promise<GoodsIssueNote[]>;
    save(note: GoodsIssueNote): Promise<void>;
    search(query: string): Promise<GoodsIssueNote[]>;
    update(note: GoodsIssueNote): Promise<void>;
    last(): Promise<GoodsIssueNote>;
}
