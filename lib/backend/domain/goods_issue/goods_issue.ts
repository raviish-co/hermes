import { GoodsIssueLine } from "../../domain/goods_issue/goods_issue_line";
import { Purpose } from "../../domain/goods_issue/purpose";
import { Decimal } from "../../shared/decimal";
import { User } from "../../domain/user";
import { ID } from "../../shared/id";

// type Options = {
//     goodsIssueId: string;
//     purpose: Purpose;
//     user: User;
//     goodsIssueLines: GoodsIssueLine[];
//     returnDate: string;
// };

export enum GoodsIssueStatus {
    PENDING = "Por Devolver",
}

export class GoodsIssue {
    readonly goodsIssueId: ID;
    readonly purpose: Purpose;
    readonly user: User;
    readonly goodsIssueLines: GoodsIssueLine[];
    readonly returnDate: Date;
    readonly issuedAt: Date;
    status: GoodsIssueStatus;
    total: Decimal;
    securityDeposit: Decimal;

    private constructor(requestId: ID, purpose: Purpose, user: User, returnDate: Date) {
        this.goodsIssueId = requestId;
        this.purpose = purpose;
        this.user = user;
        this.status = GoodsIssueStatus.PENDING;
        this.issuedAt = new Date();
        this.returnDate = returnDate;
        this.total = Decimal.fromString("0");
        this.goodsIssueLines = [];
        this.securityDeposit = Decimal.fromString("0");
    }

    static create(
        goodsIssueId: string,
        goodsIssueLines: GoodsIssueLine[],
        purpose: Purpose,
        user: User,
        returnDate: string
    ): GoodsIssue {
        const returnDateParsed = new Date(returnDate);
        const goodsIssue = new GoodsIssue(
            ID.fromString(goodsIssueId),
            purpose,
            user,
            returnDateParsed
        );
        goodsIssue.addGoodsIssueLines(goodsIssueLines);
        return goodsIssue;
    }

    addGoodsIssueLines(goodsIssueLines: GoodsIssueLine[]): void {
        for (const line of goodsIssueLines) {
            this.addGoodsIssueLine(line);
        }
        this.#calculateSecurityDeposit();
    }

    addGoodsIssueLine(goodsIssueLine: GoodsIssueLine): void {
        const total = goodsIssueLine.getTotal();
        this.goodsIssueLines.push(goodsIssueLine);
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
