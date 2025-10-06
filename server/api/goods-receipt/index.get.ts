import { useGoodsReceiptService } from "~/composables/useGoodsReceiptService";
import { GoodsReceiptNote } from "~/lib/backend/domain/goods_receipt/goods_receipt_note";
import { GoodsReceiptNoteLine } from "~/lib/backend/domain/goods_receipt/goods_receipt_note_line";
import { checkAnonymousUser } from "../check_anonymous_user";

const service = useGoodsReceiptService();

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
    checkAnonymousUser(event);

    const query = getQuery(event);

    const pageToken = Number(query.pageToken);
    const perPage = Number(query.perPage);

    const response = await service.list(pageToken, perPage);

    const notes = response.result.map(toGoodsReceiptNoteDTO);
    return { notes, total: response.total };
});
