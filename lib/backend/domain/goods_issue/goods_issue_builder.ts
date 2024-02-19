import { InvalidTotal } from "@backend/domain/goods_issue/invalid_total_error";
import { GoodsIssueLine } from "@backend/domain/goods_issue/goods_issue_line";
import { GoodsIssue } from "@backend/domain/goods_issue/goods_issue";
import { type Either, left, right } from "@backend/shared/either";
import { Purpose } from "@backend/domain/goods_issue/purpose";
import type { PurposeDTO } from "@backend/shared/types";
import type { User } from "@backend/domain/user";

export class GoodsIssueBuilder {
    #goodsIssueId: string = "";
    #purpose: Purpose = {} as Purpose;
    #goodsIssueLines: GoodsIssueLine[] = [];
    #user: User = {} as User;
    #returnDate: string = "";
    #total: string = "";
    #securityDeposit: string = "";

    constructor() {}

    withGoodsIssueId(goodsIssueId: string): GoodsIssueBuilder {
        this.#goodsIssueId = goodsIssueId;
        return this;
    }

    withPurpose(purpose: PurposeDTO): GoodsIssueBuilder {
        this.#purpose = Purpose.fromOptions({
            description: purpose.description,
            details: purpose.detailConstraint,
            notes: purpose.notes,
        });
        return this;
    }

    withGoodsIssueLines(goodsIssueLines: GoodsIssueLine[]): GoodsIssueBuilder {
        this.#goodsIssueLines = goodsIssueLines;
        return this;
    }

    withUser(user: User): GoodsIssueBuilder {
        this.#user = user;
        return this;
    }

    withReturnDate(returnDate: string): GoodsIssueBuilder {
        this.#returnDate = returnDate;
        return this;
    }

    withTotal(total: string): GoodsIssueBuilder {
        this.#total = total;
        return this;
    }

    withSecurityDeposit(securityDeposit: string): GoodsIssueBuilder {
        this.#securityDeposit = securityDeposit;
        return this;
    }

    build(): Either<InvalidTotal, GoodsIssue> {
        const goodsIssue = GoodsIssue.create({
            goodsIssueId: this.#goodsIssueId,
            purpose: this.#purpose,
            goodsIssueLines: this.#goodsIssueLines,
            user: this.#user,
            returnDate: this.#returnDate,
        });

        const isInvalidTotal = goodsIssue.verifyTotal(this.#total, this.#securityDeposit);
        if (isInvalidTotal) return left(new InvalidTotal());

        return right(goodsIssue);
    }
}
