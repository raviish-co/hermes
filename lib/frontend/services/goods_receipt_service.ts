import type { GoodsReceiptNote } from "../domain/goods_receipt_note";
import type { NoteLine } from "../domain/note_line";
import type { ConditionModel } from "../models/condition";
import type { GoodsReceiptNoteModel } from "../models/goods_receipt_note";

const auth = useAuth();

export class GoodsReceiptService {
    async new(note: GoodsReceiptNote) {
        const data = this.#toGoodsReceiptDTO(note);

        return await $fetch("/api/goods-receipt", {
            method: "post",
            body: { data },
            headers: this.headers,
        });
    }

    async getAll(): Promise<GoodsReceiptNoteModel[]> {
        const notes = await $fetch("/api/goods-receipt", {
            method: "get",
            headers: this.headers,
        });
        return notes.map(this.#toGoodsReceiptModel);
    }

    #toGoodsReceiptModel(data: any) {
        return {
            noteId: data.noteId,
            entryDate: data.entryDate,
            lines: data.lines,
        };
    }

    #toGoodsReceiptLineDTO(line: NoteLine): NoteLineDTO {
        return {
            itemId: line.itemId,
            goodQuantities: line.goodQuantities,
            badQuantities: line.badQuantities,
            condition: line.condition,
        };
    }

    #toGoodsReceiptDTO(note: GoodsReceiptNote): NoteDTO {
        return {
            entryDate: note.entryDate,
            lines: note.lines.map(this.#toGoodsReceiptLineDTO),
        };
    }

    get headers() {
        return {
            "X-Access-Token": auth.getToken(),
        };
    }
}

interface NoteDTO {
    entryDate: string;
    lines: NoteLineDTO[];
}

interface NoteLineDTO {
    itemId: string;
    goodQuantities: number;
    badQuantities?: number;
    condition?: ConditionModel;
}
