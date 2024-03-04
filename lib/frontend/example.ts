import { convertToNumber } from "./helpers/convert_to_number";
import { getCurrentLocalDateTime } from "./helpers/current_local_date_time";
import type { ItemModel } from "./models/item";

export class GoodsIssueLine {
    item: ItemModel;
    quantity: number;
    total: number;

    constructor(item: ItemModel, quantity: number) {
        this.item = item;
        this.quantity = quantity;
        this.total = 0;
    }

    calculateTotal() {
        if (!this.#isAvaliableQuantity()) {
            this.total = 0;
            return;
        }

        const price = convertToNumber(this.item.price);

        this.total = (price * this.quantity) / 100;
    }

    #isAvaliableQuantity() {
        return this.item.quantity < this.quantity;
    }
}

export class GoodsIssueNote {
    lines: GoodsIssueLine[];
    grossTotal: number;
    securityDeposit: number;
    returnDate: string;
    purpose: string;

    constructor() {
        this.grossTotal = 0;
        this.securityDeposit = 0;
        this.lines = [];
        this.returnDate = getCurrentLocalDateTime();
        this.purpose = "";
    }

    addLine(item: ItemModel, quantity: number) {
        const line = new GoodsIssueLine(item, quantity);
        line.calculateTotal();
        this.lines.push(line);

        this.#calculate();
    }

    removeLine(itemId: string) {
        this.lines = this.lines.filter((line) => line.item.itemId !== itemId);
        this.#calculate();
    }

    clear() {
        this.lines = [];
        this.grossTotal = 0;
        this.securityDeposit = 0;
    }

    #calculate() {
        this.lines.forEach((line) => this.#calculateTotal(line.total));
        this.#calculateSecurityDeposit();
    }

    #calculateTotal(total: number) {
        this.grossTotal += total;
    }

    #calculateSecurityDeposit(factor: number = 2) {
        this.securityDeposit = this.grossTotal * factor;
    }
}
