import { type Either, left, right } from "@backend/shared/either";
import { InvalidTotal } from "@backend/domain/requests/invalid_total_error";
import { RequestItem } from "@backend/domain/requests/request_item";
import { GoodsIssue } from "@backend/domain/requests/request";
import { Purpose } from "@backend/domain/requests/purpose";
import type { PurposeData } from "@backend/shared/types";
import type { User } from "@backend/domain/user";

export class GoodsIssueBuilder {
    #goodsIssueId: string = "";
    #purpose: Purpose = {} as Purpose;
    #requestItems: RequestItem[] = [];
    #user: User = {} as User;
    #returnDate: string = "";
    #total: string = "";
    #securityDeposit: string = "";

    constructor() {}

    withGoodsIssueId(goodsIssueId: string): GoodsIssueBuilder {
        this.#goodsIssueId = goodsIssueId;
        return this;
    }

    withPurpose(purpose: PurposeData): GoodsIssueBuilder {
        this.#purpose = Purpose.fromOptions({
            description: purpose.description,
            details: purpose.detailConstraint,
            notes: purpose.notes,
        });
        return this;
    }

    withRequestItems(requestItems: RequestItem[]): GoodsIssueBuilder {
        this.#requestItems = requestItems;
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
        const request = GoodsIssue.create({
            requestId: this.#goodsIssueId,
            purpose: this.#purpose,
            requestItems: this.#requestItems,
            user: this.#user,
            returnDate: this.#returnDate,
        });

        const isInvalidTotal = request.verifyTotal(this.#total, this.#securityDeposit);
        if (isInvalidTotal) return left(new InvalidTotal());

        return right(request);
    }
}
