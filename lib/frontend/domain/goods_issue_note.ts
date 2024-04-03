import type { GoodsIssueNoteModel } from "../models/goods_issue_note";
import { GoodsIssueNoteLine } from "./goods_issue_note_line";
import { formatCurrency } from "../helpers/format_currency";
import { Note, type LineOptions } from "./note";
import { Purpose } from "./purpose";

export class GoodsIssueNote extends Note {
    goodsIssueNoteId: string = "";
    purpose: Purpose;
    status: string = "";
    returnDate: string;
    grossTotal: number = 0;
    securityDeposit: number = 0;
    lines: GoodsIssueNoteLine[] = [];

    constructor(returnDate: string) {
        super();
        this.purpose = new Purpose("");
        this.returnDate = returnDate;
    }

    static build(data: GoodsIssueNoteModel): GoodsIssueNote {
        const note = new GoodsIssueNote(data.returnDate);

        note.goodsIssueNoteId = data.goodsIssueNoteId;
        note.purpose = Purpose.build(data.purpose);
        note.grossTotal = data.total;
        note.securityDeposit = data.securityDeposit;
        note.status = data.status;

        for (const line of data.lines) {
            const noteLine = new GoodsIssueNoteLine(
                line.itemId,
                line.name,
                line.price,
                line.variationValues,
                line.condition
            );

            noteLine.quantity = line.quantityToReturn;
            noteLine.quantityRequested = line.quantityRequested;
            noteLine.quantityReturned = line.quantityReturned;

            if (line.quantityReturned === 0) {
                noteLine.changeQuantity(line.quantityRequested);
            }

            note.lines.push(noteLine);
        }

        return note;
    }

    addLine(options: LineOptions, quantity: number) {
        if (this.isSameLine(options.itemId)) return;

        const line = this.createLine(options, quantity);

        line.calculate();

        if (line.totalIsZero()) return;

        this.lines.push(line);

        this.calculate();
    }

    removeLine(itemId: string) {
        this.lines = this.lines.filter((line) => line.itemId !== itemId);
        this.resetGrossTotalAndSecurityDeposit();
        this.calculate();
    }

    changeQuantity(itemId: string, quantity: number) {
        const line = this.findLine(itemId);
        if (!line) return;

        line.changeQuantity(quantity);

        line.calculate();

        this.calculate();
    }

    setPurpose(purpose: Purpose) {
        this.purpose = purpose;
    }

    isValid() {
        return (
            this.lines.length > 0 &&
            this.returnDate !== "" &&
            this.purpose.isValid() &&
            this.hasNotSameInvalidLine()
        );
    }

    clearLines() {
        this.lines = [];
        this.resetGrossTotalAndSecurityDeposit();
    }

    clear() {
        this.clearLines();
        this.purpose.clear();
    }

    findLine(itemId: string) {
        return this.lines.find((line) => line.itemId === itemId);
    }

    createLine(options: LineOptions, quantity: number) {
        const line = new GoodsIssueNoteLine(
            options.itemId,
            options.name,
            options.price,
            options.variationsValues,
            options.condition,
            options.stock
        );

        line.changeQuantity(quantity);

        return line;
    }

    private calculate() {
        this.resetGrossTotalAndSecurityDeposit();
        this.lines.forEach((line) => this.calculateTotal(line.total));
        this.calculateSecurityDeposit();
    }

    private calculateTotal(total: number) {
        this.grossTotal += total;
    }

    private resetGrossTotalAndSecurityDeposit() {
        this.grossTotal = 0;
        this.securityDeposit = 0;
    }

    private calculateSecurityDeposit() {
        this.securityDeposit = this.grossTotal * 2;
    }

    private hasNotSameInvalidLine() {
        return !this.lines.some((line) => line.totalIsZero());
    }

    get formattedGrossTotal() {
        return formatCurrency(this.grossTotal);
    }

    get formattedSecurityDeposit() {
        return formatCurrency(this.securityDeposit);
    }
}
