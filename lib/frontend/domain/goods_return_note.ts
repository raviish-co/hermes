import { GoodsIssueNoteLine } from "./goods_issue_note_line";
import { Note } from "./note";

export class GoodsReturnNote extends Note {
    constructor(lines: GoodsIssueNoteLine[] = []) {
        super();
        this.addLines(lines);
    }

    addLines(lines: GoodsIssueNoteLine[]) {
        // Mapear as lines. Adicionar os valores aos goodQuantitiesReturned and badQuantitiesReturned
        lines.forEach((line) => this.lines.push(line));
    }

    override addLine(line: GoodsIssueNoteLine, quantity: number) {
        if (!quantity) return;

        if (line.isFullyReturned()) return;

        line.changeQuantity(quantity);

        this.lines.push(line);
    }

    get returnLines() {
        return this.lines.filter((line) => !line.isFullyReturned());
    }
}
