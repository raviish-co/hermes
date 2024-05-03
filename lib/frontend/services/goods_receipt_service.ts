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
            goodQuantities: line.quantity,
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

interface GoodsReceiptDTO {
    entryDate: string;
    lines: GoodsReceiptLineDTO[];
}

interface GoodsReceiptLineDTO {
    itemId: string;
    goodQuantities: number;
    badQuantities?: number;
    condition?: ConditionModel;
}
