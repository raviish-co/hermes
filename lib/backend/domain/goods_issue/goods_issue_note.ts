import { Decimal } from "../../shared/decimal";
import { ID } from "../../shared/id";
import type { GoodsReturnNoteLine } from "../goods_return/goods_return_note_line";
import { GoodsIssueNoteLine } from "./goods_issue_note_line";
import type { NoteOptions } from "./goods_issue_note_options";
import { Purpose } from "./purpose";

enum Status {
    Pending = "Por Devolver",
    Returned = "Devolvido",
}

export class GoodsIssueNote {
    readonly noteId: ID;
    readonly purpose: Purpose;
    readonly userId: ID;
    readonly lines: GoodsIssueNoteLine[];
    readonly returnDate: Date;
    readonly fulltext: string;
    #issuedAt: Date;
    #status: Status;
    #total: Decimal;
    #securityDeposit: Decimal;

    constructor(
        noteId: ID,
        purpose: Purpose,
        user: ID,
        returnDate: Date,
        lines: GoodsIssueNoteLine[]
    ) {
        this.noteId = noteId;
        this.purpose = purpose;
        this.userId = user;
        this.returnDate = returnDate;
        this.lines = [];
        this.#issuedAt = new Date();
        this.#status = Status.Pending;
        this.#total = new Decimal(0);
        this.#securityDeposit = new Decimal(0);

        this.fulltext = this.#buildFulltext();

        this.#addLines(lines);
    }

    static restore(data: NoteOptions): GoodsIssueNote {
        const purpose = new Purpose(
            data.purpose.description,
            data.purpose.notes,
            data.purpose.details
        );

        const note = new GoodsIssueNote(
            ID.fromString(data.noteId),
            purpose,
            ID.random(),
            data.returnDate,
            data.lines.map(GoodsIssueNoteLine.restore)
        );

        note.updateStatus(data.status);
        note.#issuedAt = data.issuedAt;
        note.#total = new Decimal(data.total);
        note.#securityDeposit = new Decimal(data.securityDeposit);

        return note;
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

    get status(): string {
        return this.#status;
    }

    get total(): Decimal {
        return this.#total;
    }

    get issuedAt(): Date {
        return this.#issuedAt;
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
            this.#returnLine(line.itemId, line.goodQuantities, line.badQuantities);
        }
    }

    #returnLine(itemId: ID, goodQuantities: number, badQuantities: number): void {
        const line = this.#findLineByItemId(itemId);
        line.returnLine(goodQuantities, badQuantities);
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

    #buildFulltext(): string {
        return Object.values(this.purpose)
            .map((v) => v.toLowerCase())
            .join(" ");
    }

    private updateStatus(status: string) {
        if (Status.Pending === status) {
            this.#status = Status.Pending;
            return;
        }

        this.#status = Status.Returned;
    }
}
