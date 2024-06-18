import { GoodsReceiptNote } from "~/lib/backend/domain/goods_receipt/goods_receipt_note";
import { GoodsReceiptNoteLine } from "~/lib/backend/domain/goods_receipt/goods_receipt_note_line";
import { makeServices } from "~/lib/backend/main";

const { goodsReceiptService } = makeServices();

interface GoodsReceiptNoteLineDTO {
    lineId: string;
    itemId: string;
    goodQuantities: number;
    badQuantities?: number;
    condition?: string;
}

interface GoodsReceiptNoteDTO {
    noteId: string;
    entryDate: string;
    lines: GoodsReceiptNoteLineDTO[];
}

function toGoodsReceiptNoteLineDTO(line: GoodsReceiptNoteLine): GoodsReceiptNoteLineDTO {
    return {
        lineId: line.lineId.toString(),
        itemId: line.itemId.toString(),
        goodQuantities: line.goodQuantities,
        badQuantities: line.badQuantities,
        condition: line.condition.comment,
    };
}

function toGoodsReceiptNoteDTO(note: GoodsReceiptNote): GoodsReceiptNoteDTO {
    return {
        noteId: note.noteId.toString(),
        entryDate: note.entryDate.toISOString(),
        lines: note.lines.map(toGoodsReceiptNoteLineDTO),
    };
}

export default defineEventHandler(async (event) => {
    const notes = await goodsReceiptService.list();
    return notes.map(toGoodsReceiptNoteDTO);
});
