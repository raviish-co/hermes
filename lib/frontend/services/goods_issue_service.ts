import { a } from "vitest/dist/suite-IbNSsUWN.js";
import type { GoodsIssueNote } from "../domain/goods_issue_note";
import type { GoodsIssueNoteLine } from "../domain/goods_issue_note_line";
import type { GoodsIssueNoteModel } from "../models/goods_issue_note";

const auth = useAuth();

export class GoodsIssueService {
    async new(note: GoodsIssueNote) {
        const data = await this.#toNoteDTO(note);

        return await $fetch("/api/goods-issue", {
            method: "post",
            headers: await this.#headers(),
            body: { data },
        });
    }

    async getById(noteId: string): Promise<GoodsIssueNoteModel> {
        const data = await $fetch<GoodsIssueNoteModel>(`/api/goods-issue/${noteId}`, {
            method: "get",
            headers: await this.#headers(),
        });

        return this.#toGoodsIssueNoteModel(data);
    }

    async list(
        pageToken = 1,
        perPage = 12
    ): Promise<{ notes: GoodsIssueNoteModel[]; total: number }> {
        const response = await $fetch("/api/goods-issue/", {
            method: "get",
            query: {
                pageToken,
                perPage,
            },
            headers: await this.#headers(),
        });

        const notes = response.notes.map(this.#toGoodsIssueNoteModel);

        return { notes, total: response.total };
    }

    async search(query: string): Promise<GoodsIssueNoteModel[]> {
        const notes = await $fetch("/api/goods-issue/search/", {
            method: "get",
            query: { query },
            headers: await this.#headers(),
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

    async #toNoteDTO(note: GoodsIssueNote): Promise<NoteDTO> {
        return {
            total: note.grossTotal,
            returnDate: note.returnDate,
            purpose: note.purpose,
            lines: note.lines.map(this.#toNoteLine),
            userId: await auth.getUsername(),
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

    async #headers() {
        return {
            "X-Access-Token": await auth.getAccessToken(),
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
    userId: string;
    purpose: {
        description: string;
        details?: string;
        notes: string;
    };
}
