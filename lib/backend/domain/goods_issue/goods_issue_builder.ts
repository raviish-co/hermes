import { GoodsIssueLine } from "../../domain/goods_issue/goods_issue_line";
import { type Either, left, right } from "../../shared/either";
import { Purpose } from "../../domain/goods_issue/purpose";
import { GoodsIssueNote } from "./goods_issue_note";
import { ID } from "../../shared/id";

export class GoodsIssueNoteBuilder {
    #goodsIssueNoteId?: ID;
    #purpose: Purpose = {} as Purpose;
    #lines: GoodsIssueLine[] = [];
    #returnDate?: Date;
    #userId?: ID;

    constructor() {}

    withGoodsIssueNoteId(noteId: string): GoodsIssueNoteBuilder {
        this.#goodsIssueNoteId = ID.fromString(noteId);
        return this;
    }

    withPurpose(purpose: Purpose): GoodsIssueNoteBuilder {
        this.#purpose = purpose;
        return this;
    }

    withLines(lines: GoodsIssueLine[]): GoodsIssueNoteBuilder {
        this.#lines = lines;
        return this;
    }

    withUser(userId: string): GoodsIssueNoteBuilder {
        this.#userId = ID.fromString(userId);
        return this;
    }

    withReturnDate(returnDate: string): GoodsIssueNoteBuilder {
        this.#returnDate = new Date(returnDate);
        return this;
    }

    build(): Either<Error, GoodsIssueNote> {
        if (!this.#goodsIssueNoteId) return left(new Error("goodsIssueId is required"));

        if (!this.#returnDate) return left(new Error("returnDate is required"));

        if (!this.#userId) return left(new Error("userId is required"));

        const goodsIssue = new GoodsIssueNote(
            this.#goodsIssueNoteId,
            this.#purpose,
            this.#userId,
            this.#returnDate,
            this.#lines
        );

        return right(goodsIssue);
    }
}
