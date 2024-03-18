import { GoodsIssueNoteLine } from "./goods_issue_note_line";
import { ReturnNoteLine } from "./return_note_line";
import { NoteLine } from "./note_line";
import { Note } from "./note";

export class GoodsReturnNote extends Note {
    lines: ReturnNoteLine[] = [];

    constructor(lines: NoteLine[] = []) {
        super();
        this.addLines(lines);
    }

    addLines(lines: NoteLine[]) {
        lines.forEach((line) => {
            const returnLine = this.createLine(line);

            if (returnLine.isFullyReturned()) return;

            this.lines.push(returnLine);
        });
    }

    addLine(line: GoodsIssueNoteLine, quantity: number) {
        if (quantity === 0) return;

        const returnLine = this.createLine(line);

        returnLine.changeQuantity(quantity);

        this.lines.push(returnLine);
    }

    isValid(): boolean {
        return this.lines.some((line) => line.quantity !== 0);
    }

    private createLine(line: NoteLine) {
        const note = new ReturnNoteLine(
            line.itemId,
            line.name,
            line.quantity,
            line.quantityRequested,
            line.quantityReturned
        );

        note.variationValues = line.variationValues;

        return note;
    }
}
