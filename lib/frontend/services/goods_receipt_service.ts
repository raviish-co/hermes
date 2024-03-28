import type { GoodsReceiptNote } from "../domain/goods_receipt_note";
import type { ConditionModel } from "../models/condition";
import type { NoteLine } from "../domain/note_line";

export class GoodsReceiptService {
    async new(note: GoodsReceiptNote) {
        const data = this.#toGoodsReceiptDTO(note);

        return await $fetch("/api/goods-receipt", {
            method: "post",
            body: { data },
        });
    }

    #toGoodsReceiptLineDTO(line: NoteLine): GoodsReceiptLineDTO {
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

type GoodsReceiptDTO = {
    entryDate: string;
    lines: GoodsReceiptLineDTO[];
};

type GoodsReceiptLineDTO = {
    itemId: string;
    quantity: number;
    condition?: ConditionModel;
};
