import { GoodsIssueLine } from "./goods_issue_line";
import { Decimal } from "../../shared/decimal";
import { Purpose } from "./purpose";
import { ID } from "../../shared/id";

export enum GoodsIssueStatus {
    PENDING = "Por Devolver",
}

export class GoodsIssueNote {
    readonly goodsIssueNoteId: ID;
    readonly purpose: Purpose;
    readonly userId: ID;
    readonly goodsIssueLines: GoodsIssueLine[];
    readonly returnDate: Date;
    readonly issuedAt: Date;
    status: GoodsIssueStatus;
    total: Decimal;
    securityDeposit: Decimal;

    constructor(noteId: ID, purpose: Purpose, user: ID, returnDate: Date, lines: GoodsIssueLine[]) {
        this.goodsIssueNoteId = noteId;
        this.purpose = purpose;
        this.userId = user;
        this.status = GoodsIssueStatus.PENDING;
        this.issuedAt = new Date();
        this.returnDate = returnDate;
        this.total = Decimal.fromString("0");
        this.goodsIssueLines = [];
        this.securityDeposit = Decimal.fromString("0");

        this.#addLines(lines);
    }

    #addLines(lines: GoodsIssueLine[]): void {
        for (const line of lines) {
            this.#addLine(line);
        }
        this.#calculateSecurityDeposit();
    }

    #addLine(line: GoodsIssueLine): void {
        this.goodsIssueLines.push(line);
        this.#calculateTotal(line.total);
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
