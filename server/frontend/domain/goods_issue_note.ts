import { formatCurrency } from "../helpers/format_currency";
import type { GoodsIssueNoteModel } from "../models/goods_issue_note";
import { GoodsIssueNoteLine } from "./goods_issue_note_line";
import { Note, type LineOptions } from "./note";
import { Purpose } from "./purpose";

export class GoodsIssueNote extends Note {
    goodsIssueNoteId: string = "";
    purpose: Purpose;
    status: string = "";
    returnDate: string;
    grossTotal: number = 0;
    securityDeposit: number = 0;
    override lines: GoodsIssueNoteLine[] = [];

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

            noteLine.goodQuantities = line.goodQuantities;
            noteLine.badQuantities = line.badQuantities;
            noteLine.quantityRequested = line.quantityRequested;
            noteLine.quantityReturned = line.quantityReturned;

            noteLine.goodQuantitiesReturned = line.goodQuantities - line.goodQuantitiesReturned;
            noteLine.badQuantitiesReturned = line.badQuantities - line.badQuantitiesReturned;

            note.lines.push(noteLine);
        }

        return note;
    }

    override addLine(options: LineOptions, quantity: number, stock?: number) {
        if (!quantity || !stock) return;

        if (this.isSameLine(options.itemId)) return;

        if (quantity > stock) return;

        const line = this.createLine(options, quantity, stock);

        line.calculate();

        this.lines.push(line);

        this.calculate();
    }

    override removeLine(itemId: string) {
        this.lines = this.lines.filter((line) => line.itemId !== itemId);
        this.resetGrossTotalAndSecurityDeposit();
        this.calculate();
    }

    override changeQuantity(itemId: string, quantity: number) {
        const line = this.findLine(itemId);

        if (!line) return;

        if (quantity > line.stock) return;

        line.changeQuantity(quantity);

        line.calculate();

        this.calculate();
    }

    setPurpose(purpose: Purpose) {
        this.purpose = purpose;
    }

    override isValid() {
        return (
            this.lines.length > 0 &&
            this.returnDate !== "" &&
            this.purpose.isValid() &&
            this.hasNotSameInvalidLine()
        );
    }

    override clearLines() {
        this.lines = [];
        this.resetGrossTotalAndSecurityDeposit();
    }

    clear() {
        this.clearLines();
        this.purpose.clear();
    }

    override findLine(itemId: string) {
        return this.lines.find((line) => line.itemId === itemId);
    }

    override createLine(options: LineOptions, quantity: number, stock: number) {
        const line = new GoodsIssueNoteLine(
            options.itemId,
            options.name,
            options.price,
            options.variationsValues,
            options.condition
        );

        line.changeQuantity(quantity);

        line.changeStock(stock);

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
