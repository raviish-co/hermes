import type { ID } from "../../shared/id";
import { GoodsReturnNote } from "./goods_return_note";
import type { GoodsReturnNoteLine } from "./goods_return_note_line";

export class GoodsReturnNoteBuilder {
    #noteId?: ID;
    #userId?: ID;
    #goodsIssueNoteId?: ID;
    #lines?: GoodsReturnNoteLine[];
    #securityDepositWithheld?: number;
    #issuedAt?: Date;

    withNoteId(noteId: ID): GoodsReturnNoteBuilder {
        this.#noteId = noteId;
        return this;
    }

    withUserId(userId: ID): GoodsReturnNoteBuilder {
        this.#userId = userId;
        return this;
    }

    withGoodsIssueNoteId(goodsIssueNoteId: ID): GoodsReturnNoteBuilder {
        this.#goodsIssueNoteId = goodsIssueNoteId;
        return this;
    }

    withLines(lines: GoodsReturnNoteLine[]): GoodsReturnNoteBuilder {
        this.#lines = lines;
        return this;
    }

    withSecurityDepositWithheld(value: number): GoodsReturnNoteBuilder {
        this.#securityDepositWithheld = value;
        return this;
    }

    withIssuedAt(issuedAt: Date): GoodsReturnNoteBuilder {
        this.#issuedAt = issuedAt;
        return this;
    }

    build(): GoodsReturnNote {
        if (!this.#noteId) throw new Error("Note ID is required");

        if (!this.#userId) throw new Error("User ID is required");

        if (!this.#goodsIssueNoteId) {
            throw new Error("Goods Issue Note ID is required");
        }

        if (!this.#lines) throw new Error("Lines are required");

        if (!this.#securityDepositWithheld) {
            throw new Error("Security Deposit Withheld is required");
        }

        return new GoodsReturnNote(
            this.#noteId,
            this.#goodsIssueNoteId,
            this.#lines,
            this.#securityDepositWithheld,
            this.#userId,
            this.#issuedAt,
        );
    }
}
