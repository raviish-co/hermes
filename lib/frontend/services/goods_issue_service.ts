import type { GoodsIssueNote } from "../domain/goods_issue_note";
import type { GoodsIssueNoteLine } from "../domain/goods_issue_note_line";
import type { GoodsIssueNoteModel } from "../models/goods_issue_note";

const auth = useAuth();

export class GoodsIssueService {
    async new(note: GoodsIssueNote) {
        const data = this.#toNoteDTO(note);

        return await $fetch("/api/goods-issue", {
            method: "post",
            headers: this.headers,
            body: { data },
        });
    }

    async getById(noteId: string): Promise<GoodsIssueNoteModel> {
        const data = await $fetch<GoodsIssueNoteModel>(
            `/api/goods-issue/${noteId}`,
            {
                method: "get",
                headers: this.headers,
            },
        );

        return this.#toGoodsIssueNoteModel(data);
    }

    async list(): Promise<GoodsIssueNoteModel[]> {
        const notes = await $fetch("/api/goods-issue/", {
            method: "get",
            headers: this.headers,
        });
        return notes.map(this.#toGoodsIssueNoteModel);
    }

    async search(query: string): Promise<GoodsIssueNoteModel[]> {
        const notes = await $fetch("/api/goods-issue/search/", {
            method: "get",
            query: { query },
            headers: this.headers,
        });
        return notes.map(this.#toGoodsIssueNoteModel);
    }

    #toNoteLine(line: GoodsIssueNoteLine): LineDTO {
        return {
            itemId: line.itemId,
            goodQuantities: line.goodQuantities,
            badQuantities: line.badQuantities,
            comment: line.condition?.comment,
        };
    }

    #toNoteDTO(note: GoodsIssueNote): NoteDTO {
        return {
            total: note.grossTotal,
            returnDate: note.returnDate,
            purpose: note.purpose,
            lines: note.lines.map(this.#toNoteLine),
        };
    }

    #toGoodsIssueNoteModel(data: any) {
        return {
            goodsIssueNoteId: data.goodsIssueNoteId,
            purpose: {
                description: data.purpose.description,
                details: data.purpose.details,
                notes: data.purpose.notes,
            },
            returnDate: data.returnDate,
            status: data.status,
            securityDeposit: data.securityDeposit,
            total: data.total,
            lines: data.lines,
        };
    }

    get headers() {
        return {
            "X-Access-Token": auth.getToken(),
        };
    }
}

interface LineDTO {
    itemId: string;
    goodQuantities: number;
    badQuantities?: number;
    comment?: string;
}

interface NoteDTO {
    total: number;
    returnDate: string;
    lines: LineDTO[];
    purpose: {
        description: string;
        details?: string;
        notes: string;
    };
}
