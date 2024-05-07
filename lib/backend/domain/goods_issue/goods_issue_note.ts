import type { GoodsReturnNoteLine } from "../goods_return/goods_return_note_line";
import { GoodsIssueNoteLine } from "./goods_issue_note_line";
import { Decimal } from "../../shared/decimal";
import { Purpose } from "./purpose";
import { ID } from "../../shared/id";

enum Status {
    Pending = "Por Devolver",
    Returned = "Devolvido",
}

export class GoodsIssueNote {
    readonly goodsIssueNoteId: ID;
    readonly purpose: Purpose;
    readonly userId: ID;
    readonly lines: GoodsIssueNoteLine[];
    readonly returnDate: Date;
    readonly issuedAt: Date;
    #status: Status;
    #total: Decimal;
    #securityDeposit: Decimal;
    #securityDepositWithheld: Decimal;

    constructor(
        noteId: ID,
        purpose: Purpose,
        user: ID,
        returnDate: Date,
        lines: GoodsIssueNoteLine[]
    ) {
        this.goodsIssueNoteId = noteId;
        this.purpose = purpose;
        this.userId = user;
        this.issuedAt = new Date();
        this.returnDate = returnDate;
        this.lines = [];
        this.#status = Status.Pending;
        this.#total = new Decimal(0);
        this.#securityDeposit = new Decimal(0);
        this.#securityDepositWithheld = new Decimal(0);

        this.#addLines(lines);
    }

    verifyTotal(total: number, securityDeposit: number): boolean {
        return !this.isSameTotal(total) || !this.isSameSecurityDeposit(securityDeposit);
    }

    returnTheGoods(lines: GoodsReturnNoteLine[]): void {
        this.#returnLines(lines);

        if (!this.#allGoodsIssueWasReturned()) return;

        this.#status = Status.Returned;
    }

    isSameTotal(total: number): boolean {
        return this.#total.value === total;
    }

    isSameSecurityDeposit(securityDeposit: number): boolean {
        return this.#securityDeposit.value === securityDeposit;
    }

    isReturned(): boolean {
        return this.#status === Status.Returned;
    }

    isExpired(): boolean {
        return new Date().getTime() > new Date(this.returnDate).getTime();
    }

    get securityDeposit(): Decimal {
        return this.#securityDeposit;
    }

    get securityDepositWithheld(): Decimal {
        return this.#securityDepositWithheld;
    }

    get status(): string {
        return this.#status;
    }

    get total(): Decimal {
        return this.#total;
    }

    #addLines(lines: GoodsIssueNoteLine[]): void {
        lines.forEach((line) => this.#addLine(line));
        this.#calculateSecurityDeposit();
    }

    #addLine(line: GoodsIssueNoteLine): void {
        this.lines.push(line);
        this.#calculateTotal(line.netTotal);
    }

    #returnLines(lines: GoodsReturnNoteLine[]): void {
        for (const line of lines) {
            this.#returnLine(line.itemId, line.total);
        }
    }

    #returnLine(itemId: ID, quantityReturned: number): void {
        const line = this.#findLineByItemId(itemId);
        line.returnLine(quantityReturned);
    }

    #allGoodsIssueWasReturned(): boolean {
        return this.lines.every((line) => line.isFullyReturned());
    }

    #calculateTotal(amount: Decimal): void {
        this.#total = this.#total.add(amount);
    }

    #calculateSecurityDeposit(): void {
        this.#securityDeposit = this.#total.multiply(new Decimal(2));
    }

    #findLineByItemId(itemId: ID): GoodsIssueNoteLine {
        return this.lines.find((line) => line.itemId.equals(itemId))!;
    }
}
