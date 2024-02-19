import { Decimal } from "../../shared/decimal";
import { Purpose } from "./purpose";
import { GoodsIssueLine } from "./goods_issue_line";
import { User } from "../user";
import { ID } from "../../shared/id";

type Options = {
    goodsIssueId: string;
    purpose: Purpose;
    user: User;
    goodsIssueLines: GoodsIssueLine[];
    returnDate: string;
};

export enum RequestStatus {
    PENDING = "Por Devolver",
}

export class GoodsIssue {
    readonly requestId: ID;
    readonly purpose: Purpose;
    readonly user: User;
    readonly items: GoodsIssueLine[];
    readonly returnDate: Date;
    readonly issuedAt: Date;
    status: RequestStatus;
    total: Decimal;
    securityDeposit: Decimal;

    private constructor(requestId: ID, purpose: Purpose, user: User, returnDate: Date) {
        this.requestId = requestId;
        this.purpose = purpose;
        this.user = user;
        this.status = RequestStatus.PENDING;
        this.issuedAt = new Date();
        this.returnDate = returnDate;
        this.total = Decimal.fromString("0");
        this.items = [];
        this.securityDeposit = Decimal.fromString("0");
    }

    static create(options: Options): GoodsIssue {
        const {
            goodsIssueId: requestId,
            purpose,
            user,
            goodsIssueLines: requestItems,
            returnDate,
        } = options;
        const returnDateParsed = new Date(returnDate);
        const request = new GoodsIssue(ID.New(requestId), purpose, user, returnDateParsed);
        request.addItems(requestItems);
        return request;
    }

    addItems(items: GoodsIssueLine[]): void {
        for (const requestItem of items) {
            this.addItem(requestItem);
        }
        this.#calculateSecurityDeposit();
    }

    addItem(requestedItem: GoodsIssueLine): void {
        const total = requestedItem.getTotal();
        this.items.push(requestedItem);
        this.#calculateTotal(total);
    }

    isSameTotal(total: string): boolean {
        return this.total.value === total;
    }

    isSameSecurityDeposit(securityDeposit: string): boolean {
        return this.securityDeposit.value === securityDeposit;
    }

    verifyTotal(total: string, securityDeposit: string) {
        return !this.isSameTotal(total) || !this.isSameSecurityDeposit(securityDeposit);
    }

    getSecurityDeposit(): Decimal {
        return this.securityDeposit;
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
        this.securityDeposit = this.total.multiply(factor);
    }
}
