import { GoodsIssueNote } from "./goods_issue_note";
import type { Either } from "../../shared/either";
import { ID } from "../../shared/id";
import { GoodsIssueNoteNotFound } from "./GoodsIssueNoteNotFound";

export interface GoodsIssueRepository {
    get(goodsIssueId: ID): Promise<Either<GoodsIssueNoteNotFound, GoodsIssueNote>>;
    getAll(): Promise<GoodsIssueNote[]>;
    save(goodsIssue: GoodsIssueNote): Promise<void>;
    last(): Promise<GoodsIssueNote>;
}
