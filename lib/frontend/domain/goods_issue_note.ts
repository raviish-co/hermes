import { convertToNumber } from "../helpers/convert_to_number";
import { formatCurrency } from "../helpers/format_currency";
import type { Condition } from "../models/condition";
import type { GoodsIssueNoteModel } from "../models/goods_issue_note";
import type { ItemModel } from "../models/item";
import type { Purpose } from "../models/purpose";
import { GoodsIssueNoteLine } from "./goods_issue_note_line";

export class GoodsIssueNote {
    goodsIssueNoteId: string;
    lines: GoodsIssueNoteLine[];
    grossTotal: number;
    securityDeposit: number;
    returnDate: string;
    purpose: Purpose;
    status: string;

    constructor(returnDate: string) {
        this.grossTotal = 0;
        this.securityDeposit = 0;
        this.lines = [];
        this.returnDate = returnDate;
        this.purpose = {} as Purpose;
        this.status = "";
        this.goodsIssueNoteId = "";
    }

    static build(data: GoodsIssueNoteModel): GoodsIssueNote {
        const note = new GoodsIssueNote(data.returnDate);

        note.goodsIssueNoteId = data.goodsIssueNoteId;
        note.purpose = data.purpose;
        note.grossTotal = convertToNumber(data.total);
        note.securityDeposit = convertToNumber(data.securityDeposit);
        note.status = data.status;
        note.lines = data.lines as GoodsIssueNoteLine[];

        return note;
    }

    addLine(item: ItemModel, quantity: number) {
        const isSameItem = this.verifyItem(item.itemId);
        if (isSameItem) return;

        const line = new GoodsIssueNoteLine(item, quantity);

        line.calculateTotal();

        if (line.totalIsZero()) return;

        this.lines.push(line);

        this.calculate();
    }

    removeLine(itemId: string) {
        this.lines = this.lines.filter((line) => line.itemId !== itemId);
        this.resetGrossTotalAndSecurityDeposit();
        this.calculate();
    }

    updateLineQuantity(itemId: string) {
        const line = this.lines.find((line) => line.itemId === itemId);
        if (!line) return;

        if (!line.quantity) line.quantity = 0;

        line.calculateTotal();

        this.calculate();
    }

    updateLineCondition(itemId: string, condition: Condition) {
        const line = this.lines.find((line) => line.itemId === itemId);
        if (!line) return;

        line.updateCondition(condition.status, condition.comment);
    }

    setPurpose(purpose: Purpose) {
        this.purpose = purpose;
    }

    isValid() {
        return this.lines.length > 0 && this.returnDate !== "";
    }

    clear() {
        this.lines = [];
        this.resetGrossTotalAndSecurityDeposit();
    }

    verifyItem(itemId: string) {
        return this.lines.some((line) => line.itemId === itemId);
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

    get formattedGrossTotal() {
        return formatCurrency(this.grossTotal);
    }

    get formattedSecurityDeposit() {
        return formatCurrency(this.securityDeposit);
    }
}
