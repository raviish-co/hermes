import type { ItemModel } from "../models/item";
import { GoodsReceiptNoteLine } from "./goods_receipt_note_line";
import { Note } from "./note";

export class GoodsReceiptNote extends Note {
    lines: GoodsReceiptNoteLine[] = [];
    entryDate: string;

    constructor(entryDate: string) {
        super();
        this.entryDate = entryDate;
    }

    addLine(item: ItemModel, quantity: number) {
        if (this.isSameLine(item.itemId)) return;

        const line = this.createLine(item, quantity);

        this.lines.push(line);
    }

    private createLine(item: ItemModel, quantity: number) {
        return new GoodsReceiptNoteLine(
            item.itemId,
            item.name,
            quantity,
            item.variationsValues,
            item.condition
        );
    }

    isValid(): boolean {
        return this.lines.some((line) => line.quantity !== 0);
    }

    changeQuantity(itemId: string, quantity: number) {
        const line = this.findLine(itemId);
        if (!line) return;

        line.changeQuantity(quantity || 0);
    }

    clear() {
        this.lines = [];
    }
}
