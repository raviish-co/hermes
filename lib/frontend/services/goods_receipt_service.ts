import type { GoodsReceiptNote } from "../domain/goods_receipt_note";
import type { NoteLine } from "../domain/note_line";
import type { ConditionModel } from "../models/condition";
import type { GoodsReceiptNoteModel } from "../models/goods_receipt_note";

const auth = useAuth();

export class GoodsReceiptService {
    async new(note: GoodsReceiptNote) {
        const data = await this.#toGoodsReceiptDTO(note);

        return await $fetch("/api/goods-receipt", {
            method: "post",
            body: { data },
            headers: await this.#headers(),
        });
    }

    async getAll(): Promise<GoodsReceiptNoteModel[]> {
        const notes = await $fetch("/api/goods-receipt", {
            method: "get",
            headers: await this.#headers(),
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
            consignmentValue: line.consignmentValue,
            isConsignment: line.isConsignment,
        };
    }

    async #toGoodsReceiptDTO(note: GoodsReceiptNote): Promise<NoteDTO> {
        return {
            userId: await auth.getUsername(),
            entryDate: note.entryDate,
            lines: note.lines.map(this.#toGoodsReceiptLineDTO),
        };
    }

    async #headers() {
        return {
            "X-Access-Token": await auth.getAccessToken(),
        };
    }
}

interface NoteDTO {
    entryDate: string;
    userId: string;
    lines: NoteLineDTO[];
}

interface NoteLineDTO {
    itemId: string;
    goodQuantities: number;
    consignmentValue?: number;
    isConsignment?: boolean;
    badQuantities?: number;
    condition?: ConditionModel;
}
