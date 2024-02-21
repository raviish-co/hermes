import { InvalidTotal } from "../../domain/goods_issue/invalid_total_error";
import { GoodsIssueLine } from "../../domain/goods_issue/goods_issue_line";
import { GoodsIssueNote } from "./goods_issue_note";
import { type Either, left, right } from "../../shared/either";
import { Purpose } from "../../domain/goods_issue/purpose";
import { ID } from "../../shared/id";

export class GoodsIssueBuilder {
    #goodsIssueId?: string;
    #purpose: Purpose = {} as Purpose;
    #lines: GoodsIssueLine[] = [];
    #returnDate?: string;
    #userId?: ID;

    constructor() {}

    withGoodsIssueId(goodsIssueId: string): GoodsIssueBuilder {
        this.#goodsIssueId = goodsIssueId;
        return this;
    }

    withPurpose(purpose: Purpose): GoodsIssueBuilder {
        this.#purpose = purpose;
        return this;
    }

    withLines(lines: GoodsIssueLine[]): GoodsIssueBuilder {
        this.#lines = lines;
        return this;
    }

    withUser(userId: ID): GoodsIssueBuilder {
        this.#userId = userId;
        return this;
    }

    withReturnDate(returnDate: string): GoodsIssueBuilder {
        this.#returnDate = returnDate;
        return this;
    }

    build(): Either<InvalidTotal, GoodsIssueNote> {
        // Corrigir aqui
        if (!this.#goodsIssueId) return left(new InvalidTotal());

        // Corrigir aqui
        if (!this.#returnDate) return left(new InvalidTotal());

        // Corrigir aqui
        if (!this.#userId) return left(new InvalidTotal());

        const returnDateParsed = new Date(this.#returnDate);

        const goodsIssue = new GoodsIssueNote(
            ID.fromString(this.#goodsIssueId),
            this.#purpose,
            this.#userId,
            returnDateParsed,
            this.#lines
        );

        return right(goodsIssue);
    }
}
