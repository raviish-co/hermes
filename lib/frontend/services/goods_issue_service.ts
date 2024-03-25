import type { ConditionModel } from "../models/condition";
import type { GoodsIssueNoteModel } from "../models/goods_issue_note";
import type { GoodsIssueNoteLine } from "../domain/goods_issue_note_line";
import type { GoodsIssueNote } from "../domain/goods_issue_note";
import type { PurposeModel } from "@frontend/models/purpose";

export class GoodsIssueService {
    async new(note: GoodsIssueNote) {
        const data = this.#toGoodsIssueDTO(note);

        return await $fetch("/api/goods-issue", {
            method: "post",
            body: { data },
        });
    }

    async getById(noteId: string): Promise<GoodsIssueNoteModel> {
        return await $fetch(`/api/goods-issue/${noteId}`, {
            method: "get",
        });
    }

    async list(): Promise<GoodsIssueNoteModel[]> {
        const response = await $fetch("/api/goods-issue", { method: "get" });

        return response.map((data) => ({
            goodsIssueNoteId: data.goodsIssueNoteId,
            purpose: data.purpose as PurposeModel,
            returnDate: data.returnDate,
            status: data.status,
            securityDeposit: data.securityDeposit,
            total: data.total,
            lines: data.lines,
        }));
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
    purpose: PurposeModel;
}
