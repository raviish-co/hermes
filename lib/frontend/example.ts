import type { VariationValue } from "./models/variation_value";
import { convertToNumber } from "./helpers/convert_to_number";
import { formatCurrency } from "./helpers/format_currency";
import type { Condition } from "./models/condition";
import type { ItemModel } from "./models/item";
import { formatVariationValues } from "./helpers/format_variation_values";
import type { Purpose } from "./models/purpose";

export class GoodsIssueNoteLine {
    itemId: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
    total: number;
    variationsValues?: VariationValue[];
    condition?: Condition;

    constructor(item: ItemModel, quantity: number) {
        this.itemId = item.itemId;
        this.name = item.name;
        this.quantity = quantity;
        this.price = convertToNumber(item.price);
        this.condition = item.condition;
        this.variationsValues = item.variationsValues;
        this.stock = item.quantity;
        this.total = 0;
    }

    calculateTotal() {
        if (!this.isAvaliableQuantity()) {
            this.total = 0;
            return;
        }

        this.total = this.price * this.quantity;
    }

    updateCondition(status: "Bom" | "Mau", comment?: string) {
        this.condition = { status, comment };
    }

    totalIsZero() {
        return this.total == 0;
    }

    get formattedPrice() {
        return formatCurrency(this.price);
    }

    get formattedTotal() {
        return formatCurrency(this.total);
    }

    get formattedVariationsValues() {
        return formatVariationValues(this.variationsValues);
    }

    private isAvaliableQuantity() {
        return this.quantity <= this.stock;
    }
}

export class GoodsIssueNote {
    lines: GoodsIssueNoteLine[];
    grossTotal: number;
    securityDeposit: number;
    returnDate: string;
    purpose: Purpose;

    constructor(returnDate: string) {
        this.grossTotal = 0;
        this.securityDeposit = 0;
        this.lines = [];
        this.returnDate = returnDate;
        this.purpose = {} as Purpose;
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

    private verifyItem(itemId: string) {
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
