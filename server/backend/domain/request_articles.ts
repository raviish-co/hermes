import { User } from "./user";
import { Purpose, PurposeOptions } from "../domain/purpose";
import { RequestLine } from "./request_line";

export enum RequestStatus {
    PENDING = "Por Devolver",
}

export class RequestArticles {
    readonly purpose: Purpose;
    readonly user: User;
    readonly requestLines: RequestLine[] = [];
    readonly returnDate: Date;
    readonly issuedAt: Date;
    status: string;
    total = 0;

    private constructor(purpose: Purpose, user: User, returnDate: Date) {
        this.purpose = purpose;
        this.user = user;
        this.status = RequestStatus.PENDING;
        this.issuedAt = new Date();
        this.returnDate = returnDate;
    }

    static create(purposeOptions: PurposeOptions, user: User, returnDate: string): RequestArticles {
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
        this.total += requestLine.total;
    }

    getStatus(): string {
        return this.status;
    }

    getTotal(): number {
        return this.total;
    }
}
