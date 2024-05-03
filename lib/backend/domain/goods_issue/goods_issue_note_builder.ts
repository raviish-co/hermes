import { GoodsIssueNoteLine } from "./goods_issue_note_line";
import { type Either, left, right } from "../../shared/either";
import { Purpose } from "./purpose";
import { GoodsIssueNote } from "./goods_issue_note";
import { ID } from "../../shared/id";

export class GoodsIssueNoteBuilder {
    #noteId?: ID;
    #purpose: Purpose = {} as Purpose;
    #lines: GoodsIssueNoteLine[] = [];
    #returnDate?: Date;
    #userId?: ID;

    constructor() {}

    withNoteId(noteId: string): GoodsIssueNoteBuilder {
        this.#noteId = ID.fromString(noteId);
        return this;
    }

    withPurpose(purpose: Purpose): GoodsIssueNoteBuilder {
        this.#purpose = purpose;
        return this;
    }

    withLines(lines: GoodsIssueNoteLine[]): GoodsIssueNoteBuilder {
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
        if (!this.#noteId) return left(new Error("goodsIssueId is required"));

        if (!this.#returnDate) return left(new Error("returnDate is required"));

        if (!this.#userId) return left(new Error("userId is required"));

        const goodsIssue = new GoodsIssueNote(
            this.#noteId,
            this.#purpose,
            this.#userId,
            this.#returnDate,
            this.#lines
        );

        return right(goodsIssue);
    }
}
