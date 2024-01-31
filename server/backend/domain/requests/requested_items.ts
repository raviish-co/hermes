import { Decimal } from "../../shared/decimal";
import { Purpose } from "../purposes/purpose";
import { RequestItem } from "./request_item";
import { User } from "../user";

type Options = {
    purpose: Purpose;
    user: User;
    returnDate: string;
};

export enum RequestStatus {
    PENDING = "Por Devolver",
}

export class RequestedItems {
    readonly purpose: Purpose;
    readonly user: User;
    readonly items: RequestItem[];
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
        this.items = [];
    }

    static create(options: Options): RequestedItems {
        const { purpose, user, returnDate } = options;
        const returnDateParsed = new Date(returnDate);
        const requestedArticles = new RequestedItems(purpose, user, returnDateParsed);
        return requestedArticles;
    }

    addItems(items: RequestItem[]): void {
        for (const requestLine of items) {
            this.addItem(requestLine);
        }
    }

    addItem(requestedItem: RequestItem): void {
        this.items.push(requestedItem);
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
