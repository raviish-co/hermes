import { InvalidTotal } from "./invalid_total_error";
import { RequestItem } from "./request_item";
import { PurposeData } from "../purposes/purpose_data";
import { Either, left, right } from "../../shared/either";
import { Purpose } from "../purposes/purpose";
import { Request } from "./request";
import { User } from "../user";

export class RequestBuilder {
    #requestId: string = "";
    #purpose: Purpose = {} as Purpose;
    #requestItems: RequestItem[] = [];
    #user: User = {} as User;
    #returnDate: string = "";
    #total: string = "";
    #securityDeposit: string = "";

    constructor() {}

    withRequestId(requestId: string): RequestBuilder {
        this.#requestId = requestId;
        return this;
    }

    withPurpose(purpose: PurposeData): RequestBuilder {
        this.#purpose = Purpose.fromOptions(purpose);
        return this;
    }

    withRequestItems(requestItems: RequestItem[]): RequestBuilder {
        this.#requestItems = requestItems;
        return this;
    }

    withUser(user: User): RequestBuilder {
        this.#user = user;
        return this;
    }

    withReturnDate(returnDate: string): RequestBuilder {
        this.#returnDate = returnDate;
        return this;
    }

    withTotal(total: string): RequestBuilder {
        this.#total = total;
        return this;
    }

    withSecurityDeposit(securityDeposit: string): RequestBuilder {
        this.#securityDeposit = securityDeposit;
        return this;
    }

    build(): Either<InvalidTotal, Request> {
        const request = Request.create({
            requestId: this.#requestId,
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
