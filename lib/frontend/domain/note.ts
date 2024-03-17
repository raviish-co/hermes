import type { Condition } from "../models/condition";
import { NoteLine } from "./note_line";

export abstract class Note {
    lines: NoteLine[] = [];

    removeLine(itemId: string) {
        this.lines = this.lines.filter((line) => line.itemId !== itemId);
    }

    clearLines() {
        this.lines = [];
    }

    isSameLine(itemId: string) {
        return this.lines.some((line) => line.itemId === itemId);
    }

    findLine(itemId: string) {
        return this.lines.find((line) => line.itemId === itemId);
    }

    updateCondition(itemId: string, condition: Condition) {
        const line = this.findLine(itemId);
        if (!line) return;

        line.updateCondition(condition.status, condition.comment);
    }

    abstract isValid(): boolean;
}
