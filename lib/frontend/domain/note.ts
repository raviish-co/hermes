import type { VariationValueModel } from "../models/variation_value";
import type { ConditionModel } from "../models/condition";
import { NoteLine } from "./note_line";

export type LineOptions = {
    itemId: string;
    name: string;
    price: number;
    variationsValues?: VariationValueModel[];
    condition?: ConditionModel;
    quantityRequested?: number;
    quantityReturned?: number;
    quantityToReturn?: number;
};

export class Note {
    lines: NoteLine[];

    constructor() {
        this.lines = [];
    }

    addLine(options: LineOptions, quantity: number, stock: number) {
        if (!quantity) return;

        if (this.isSameLine(options.itemId)) return;

        const line = this.createLine(options, quantity, stock);

        this.lines.push(line);
    }

    updateCondition(itemId: string, condition: ConditionModel) {
        const line = this.findLine(itemId);
        if (!line) return;

        line.updateCondition(condition.status, condition.comment);
    }

    findLine(itemId: string) {
        return this.lines.find((line) => line.itemId === itemId);
    }

    removeLine(itemId: string) {
        this.lines = this.lines.filter((line) => line.itemId !== itemId);
    }

    isSameLine(itemId: string) {
        return this.lines.some((line) => line.itemId === itemId);
    }

    changeQuantity(itemId: string, quantity: number) {
        const line = this.findLine(itemId);
        if (!line) return;

        line.changeQuantity(quantity);
    }

    updateBadQuantities(itemId: string, goodQuantities: number, badQuantities: number) {
        const line = this.findLine(itemId);

        if (!line) return;

        line.changeBadQuantities(goodQuantities, badQuantities);
    }

    clearLines() {
        this.lines = [];
    }

    isValid(): boolean {
        return this.lines.some((line) => line.goodQuantities !== 0);
    }

    createLine(options: LineOptions, quantity: number, stock: number) {
        const line = new NoteLine(
            options.itemId,
            options.name,
            options.variationsValues,
            options.condition
        );

        line.changeQuantity(quantity);

        line.changeStock(stock);

        return line;
    }
}
