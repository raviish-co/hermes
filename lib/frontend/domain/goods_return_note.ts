import { GoodsIssueNoteLine } from "./goods_issue_note_line";
import { Note } from "./note";

export class GoodsReturnNote extends Note {
    constructor(lines: GoodsIssueNoteLine[] = []) {
        super();
        this.addLines(lines);
    }

    addLines(lines: GoodsIssueNoteLine[]) {
        lines.forEach((line) => this.lines.push(line));
    }

    get returnLines() {
        return this.lines.filter((line) => !line.isFullyReturned());
    }
}
