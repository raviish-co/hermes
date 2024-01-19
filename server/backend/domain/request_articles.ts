import { User } from "./user";
import { Purpose, PurposeOptions } from "../domain/purpose";
import { RequestLine } from "./request_line";
import { Amount } from "./amount";

export enum RequestStatus {
    PENDING = "Por Devolver",
}

export type RequestArticlesOptions = {
    purposeOptions: PurposeOptions;
    user: User;
    returnDate: string;
    total: string;
};

export class RequestArticles {
    readonly purpose: Purpose;
    readonly user: User;
    readonly requestLines: RequestLine[];
    readonly returnDate: Date;
    readonly issuedAt: Date;
    status: string;
    total: Amount;

    private constructor(purpose: Purpose, user: User, returnDate: Date) {
        this.purpose = purpose;
        this.user = user;
        this.status = RequestStatus.PENDING;
        this.issuedAt = new Date();
        this.returnDate = returnDate;
        this.total = Amount.fromString("0");
        this.requestLines = [];
    }

    static create(options: RequestArticlesOptions): RequestArticles {
        const { purposeOptions, user, returnDate } = options;
        const purpose = Purpose.fromOptions(purposeOptions);
        const returnDateParsed = new Date(returnDate);
        const requestArticles = new RequestArticles(purpose, user, returnDateParsed);
        return requestArticles;
    }

    addRequestLines(requestLines: RequestLine[]): void {
        for (const requestLine of requestLines) {
            this.addRequestLine(requestLine);
        }
    }

    addRequestLine(requestLine: RequestLine): void {
        this.requestLines.push(requestLine);
        this.total = this.total.add(requestLine.getTotal());
    }

    getStatus(): string {
        return this.status;
    }

    getTotal(): Amount {
        return this.total;
    }
}
