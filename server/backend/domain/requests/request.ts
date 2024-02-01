import { Decimal } from "../../shared/decimal";
import { Purpose } from "../purposes/purpose";
import { RequestItem } from "./request_item";
import { User } from "../user";
import { ID } from "../../shared/id";

type Options = {
    requestId: string;
    purpose: Purpose;
    user: User;
    returnDate: string;
};

export enum RequestStatus {
    PENDING = "Por Devolver",
}

export class Request {
    readonly requestId: ID;
    readonly purpose: Purpose;
    readonly user: User;
    readonly items: RequestItem[];
    readonly returnDate: Date;
    readonly issuedAt: Date;
    status: RequestStatus;
    total: Decimal;
    securityDeposity: Decimal;

    private constructor(requestId: ID, purpose: Purpose, user: User, returnDate: Date) {
        this.requestId = requestId;
        this.purpose = purpose;
        this.user = user;
        this.status = RequestStatus.PENDING;
        this.issuedAt = new Date();
        this.returnDate = returnDate;
        this.total = Decimal.fromString("0");
        this.items = [];
        this.securityDeposity = Decimal.fromString("0");
    }

    static create(options: Options): Request {
        const { requestId, purpose, user, returnDate } = options;
        const returnDateParsed = new Date(returnDate);
        return new Request(ID.New(requestId), purpose, user, returnDateParsed);
    }

    addItems(items: RequestItem[]): void {
        for (const requestLine of items) {
            this.addItem(requestLine);
        }
        this.#calculateSecurityDeposit();
    }

    addItem(requestedItem: RequestItem): void {
        const total = requestedItem.getTotal();
        this.items.push(requestedItem);
        this.#calculateTotal(total);
    }

    isSameTotal(total: string): boolean {
        return this.total.value === total;
    }

    isSameSecurityDeposit(securityDeposit: string): boolean {
        return this.securityDeposity.value === securityDeposit;
    }

    getSecurityDeposit(): Decimal {
        return this.securityDeposity;
    }

    getStatus(): string {
        return this.status;
    }

    getTotal(): Decimal {
        return this.total;
    }

    #calculateTotal(amount: Decimal): void {
        this.total = this.total.add(amount);
    }

    #calculateSecurityDeposit(): void {
        const factor = Decimal.fromString("2");
        this.securityDeposity = this.total.multiply(factor);
    }
}
