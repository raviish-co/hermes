import type { GoodsIssueNoteModel } from "../models/goods_issue_note";
import type { GoodsIssueNoteLine } from "../domain/goods_issue_note_line";
import type { GoodsIssueNote } from "../domain/goods_issue_note";
import type { ConditionModel } from "../models/condition";

export class GoodsIssueService {
    async new(note: GoodsIssueNote) {
        const data = this.#toGoodsIssueDTO(note);

        return await $fetch("/api/goods-issue", {
            method: "post",
            body: { data },
        });
    }

    async getById(noteId: string): Promise<GoodsIssueNoteModel> {
        const data = await $fetch<GoodsIssueNoteModel>(`/api/goods-issue/${noteId}`, {
            method: "get",
        });

        return this.#toGoodsIssueNoteModel(data);
    }

    async list(): Promise<GoodsIssueNoteModel[]> {
        const notes = await $fetch("/api/goods-issue/", { method: "get" });
        return notes.map(this.#toGoodsIssueNoteModel);
    }

    #toGoodsIssueLine(line: GoodsIssueNoteLine): GoodsIssueLineDTO {
        return {
            itemId: line.itemId,
            quantity: line.quantity,
            condition: {
                comment: line?.condition?.comment,
                status: line.condition?.status!,
            },
        };
    }

    #toGoodsIssueDTO(note: GoodsIssueNote): GoodsIssueDTO {
        return {
            total: note.grossTotal,
            returnDate: note.returnDate,
            purpose: note.purpose,
            lines: note.lines.map(this.#toGoodsIssueLine),
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
}

interface GoodsIssueLineDTO {
    itemId: string;
    quantity: number;
    condition?: ConditionModel;
}

interface GoodsIssueDTO {
    total: number;
    returnDate: string;
    lines: GoodsIssueLineDTO[];
    purpose: {
        description: string;
        details?: string;
        notes: string;
    };
}
