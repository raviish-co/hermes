import { convertToNumber } from "../helpers/convert_to_number";
import { formatCurrency } from "../helpers/format_currency";
import type { GoodsIssueNoteModel } from "../models/goods_issue_note";
import type { ItemModel } from "../models/item";
import { GoodsIssueNoteLine } from "./goods_issue_note_line";
import { Note } from "./note";
import { Purpose } from "./purpose";

export class GoodsIssueNote extends Note {
    goodsIssueNoteId: string = "";
    lines: GoodsIssueNoteLine[] = [];
    grossTotal: number = 0;
    securityDeposit: number = 0;
    returnDate: string;
    purpose: Purpose = new Purpose("", "");
    status: string = "";

    constructor(returnDate: string) {
        super();
        this.returnDate = returnDate;
    }

    static build(data: GoodsIssueNoteModel): GoodsIssueNote {
        const note = new GoodsIssueNote(data.returnDate);

        note.goodsIssueNoteId = data.goodsIssueNoteId;
        note.purpose = new Purpose(
            data.purpose.description,
            data.purpose.notes,
            data.purpose.details
        );

        note.grossTotal = convertToNumber(data.total);
        note.securityDeposit = convertToNumber(data.securityDeposit);
        note.status = data.status;

        for (const line of data.lines) {
            const noteLine = new GoodsIssueNoteLine(
                line.itemId,
                line.name,
                line.quantity,
                line.price,
                line.quantityReturned
            );

            noteLine.variationValues = line.variationValues;
            noteLine.condition = line.condition;
            note.lines.push(noteLine);
        }

        return note;
    }

    addLine(item: ItemModel, quantity: number) {
        if (this.isSameLine(item.itemId)) return;

        const line = new GoodsIssueNoteLine(
            item.itemId,
            item.name,
            quantity,
            item.price,
            item.quantity
        );

        line.variationValues = item.variationsValues;
        line.condition = item.condition;

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

    private calculateSecurityDeposit(factor: number = 2) {
        this.securityDeposit = this.grossTotal * factor;
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
