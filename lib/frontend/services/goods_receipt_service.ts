import type { GoodsReceiptNote } from "../domain/goods_receipt_note";
import type { GoodsReceiptNoteLine } from "../domain/goods_receipt_note_line";
import type { Condition } from "../models/condition";

export class GoodsReceiptService {
    async new(note: GoodsReceiptNote) {
        const data = this.#toGoodsReceiptDTO(note);

        return await $fetch("/api/goods-receipt", {
            method: "post",
            body: { data },
        });
    }

    #toGoodsReceiptLineDTO(line: GoodsReceiptNoteLine): GoodsReceiptLineDTO {
        return {
            itemId: line.itemId,
            quantity: line.quantity,
            condition: line.condition,
        };
    }

    #toGoodsReceiptDTO(note: GoodsReceiptNote): GoodsReceiptDTO {
        return {
            entryDate: note.entryDate,
            lines: note.lines.map(this.#toGoodsReceiptLineDTO),
        };
    }
}

export type GoodsReceiptDTO = {
    lines: GoodsReceiptLineDTO[];
    entryDate: string;
};

export type GoodsReceiptLineDTO = {
    itemId: string;
    quantity: number;
    condition?: Condition;
};
