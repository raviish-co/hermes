import { GoodsIssueLine } from "./goods_issue_line";
import { Decimal } from "../../shared/decimal";
import { Purpose } from "./purpose";
import { ID } from "../../shared/id";
import type { GoodsReturnLine } from "./goods_return_note_line";

export enum GoodsIssueStatus {
    Pending = "Por Devolver",
    Returned = "Devolvido",
}

export class GoodsIssueNote {
    readonly goodsIssueNoteId: ID;
    readonly purpose: Purpose;
    readonly userId: ID;
    readonly goodsIssueLines: GoodsIssueLine[];
    readonly returnDate: Date;
    readonly issuedAt: Date;
    goodsReturnLines: GoodsReturnLine[];
    status: GoodsIssueStatus;
    total: Decimal;
    securityDeposit: Decimal;
    depositWithheld: Decimal;

    constructor(noteId: ID, purpose: Purpose, user: ID, returnDate: Date, lines: GoodsIssueLine[]) {
        this.goodsIssueNoteId = noteId;
        this.purpose = purpose;
        this.userId = user;
        this.status = GoodsIssueStatus.Pending;
        this.issuedAt = new Date();
        this.returnDate = returnDate;
        this.total = Decimal.fromString("0");
        this.goodsIssueLines = [];
        this.securityDeposit = Decimal.fromString("0");
        this.depositWithheld = Decimal.fromString("0");
        this.goodsReturnLines = [];

        this.#addLines(lines);
    }

    verifyTotal(total: string, securityDeposit: string) {
        return !this.isSameTotal(total) || !this.isSameSecurityDeposit(securityDeposit);
    }

    returnTheGoods(depositWithheld: string): void {
        if (this.depositWithheld.isZero()) {
            this.depositWithheld = Decimal.fromString(depositWithheld);
        }

        if (!this.#allGoodsIssueWasReturned()) return;

        this.status = GoodsIssueStatus.Returned;
    }

    returnLines(lines: GoodsReturnLine[]): void {
        for (const returnLine of lines) {
            this.#addReturnLine(returnLine);
        }
    }

    isSameTotal(total: string): boolean {
        return this.total.value === total;
    }

    isSameSecurityDeposit(securityDeposit: string): boolean {
        return this.securityDeposit.value === securityDeposit;
    }

    isReturned(): boolean {
        return this.status === GoodsIssueStatus.Returned;
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

    #addReturnLine(line: GoodsReturnLine): void {
        this.goodsReturnLines.push(line);

        this.#returnLine(line);
    }

    #returnLine(returnLine: GoodsReturnLine) {
        const line = this.#findGoodsIssueLineByItemId(returnLine.itemId);
        line.returnLine(returnLine.quantityReturned);
    }

    #allGoodsIssueWasReturned(): boolean {
        return this.goodsIssueLines.every((line) => line.isFullyReturned());
    }

    #calculateTotal(amount: Decimal): void {
        this.total = this.total.add(amount);
    }

    #calculateSecurityDeposit(): void {
        const factor = Decimal.fromString("2");
        this.securityDeposit = this.total.multiply(factor);
    }

    #findGoodsIssueLineByItemId(itemId: ID): GoodsIssueLine {
        return this.goodsIssueLines.find((line) => line.itemId.equals(itemId))!;
    }
}
