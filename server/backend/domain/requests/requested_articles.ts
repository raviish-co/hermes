import { User } from "../user";
import { Purpose, PurposeOptions } from "../purpose";
import { RequestedItem } from "./requested_item";
import { Decimal } from "../../shared/decimal";

export enum RequestStatus {
    PENDING = "Por Devolver",
}

export type RequestOptions = {
    purposeOptions: PurposeOptions;
    user: User;
    returnDate: string;
};

export class RequestedArticles {
    readonly purpose: Purpose;
    readonly user: User;
    readonly requestedItems: RequestedItem[];
    readonly returnDate: Date;
    readonly issuedAt: Date;
    status: RequestStatus;
    total: Decimal;

    private constructor(purpose: Purpose, user: User, returnDate: Date) {
        this.purpose = purpose;
        this.user = user;
        this.status = RequestStatus.PENDING;
        this.issuedAt = new Date();
        this.returnDate = returnDate;
        this.total = Decimal.fromString("0");
        this.requestedItems = [];
    }

    static create(options: RequestOptions): RequestedArticles {
        const { purposeOptions, user, returnDate } = options;
        const purpose = Purpose.fromOptions(purposeOptions);
        const returnDateParsed = new Date(returnDate);
        const requestedArticles = new RequestedArticles(purpose, user, returnDateParsed);
        return requestedArticles;
    }

    addRequestedItems(requestLines: RequestedItem[]): void {
        for (const requestLine of requestLines) {
            this.addRequestedItem(requestLine);
        }
    }

    addRequestedItem(requestedItem: RequestedItem): void {
        this.requestedItems.push(requestedItem);
        this.total = this.total.add(requestedItem.getTotal());
    }

    isSameTotal(total: string): boolean {
        return this.total.value === total;
    }

    getStatus(): string {
        return this.status;
    }

    getTotal(): Decimal {
        return this.total;
    }
}
