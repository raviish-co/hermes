import { GoodsIssueLine } from "./goods_issue_line";
import { Decimal } from "../../shared/decimal";
import { Purpose } from "./purpose";
import { ID } from "../../shared/id";
import type { GoodsReturnNoteLine } from "../goods_return/goods_return_note_line";

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
    status: GoodsIssueStatus;
    total: Decimal;
    securityDeposit: Decimal;
    securityDepositWithheld: Decimal;

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
        this.securityDepositWithheld = Decimal.fromString("0");

        this.#addLines(lines);
    }

    verifyTotal(total: string, securityDeposit: string) {
        return !this.isSameTotal(total) || !this.isSameSecurityDeposit(securityDeposit);
    }

    returnTheGoods(lines: GoodsReturnNoteLine[]): void {
        this.#returnLines(lines);

        if (!this.#allGoodsIssueWasReturned()) return;

        this.status = GoodsIssueStatus.Returned;
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

    #returnLines(lines: GoodsReturnNoteLine[]): void {
        for (const line of lines) {
            this.#returnLine(line.itemId, line.quantityReturned);
        }
    }

    #returnLine(itemId: ID, quantityReturned: number): void {
        const line = this.#findLineByItemId(itemId);
        line.returnLine(quantityReturned);
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

    #findLineByItemId(itemId: ID): GoodsIssueLine {
        return this.goodsIssueLines.find((line) => line.itemId.equals(itemId))!;
    }
}
