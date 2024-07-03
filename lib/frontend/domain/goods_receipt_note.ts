import { Note, type LineOptions } from "./note";

export class GoodsReceiptNote extends Note {
    entryDate: string;

    constructor(entryDate: string) {
        super();
        this.entryDate = entryDate;
    }

    override addLine(options: LineOptions, quantity: number, stock?: number) {
        console.log(options, quantity, stock);

        if (this.isSameLine(options.itemId)) return;

        const line = this.createLine(options, quantity, 0);

        this.lines.push(line);
    }
}
