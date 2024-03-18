import type { Condition } from "../models/condition";
import type { GoodsIssueNoteModel } from "../models/goods_issue_note";
import type { GoodsIssueNoteLine } from "../domain/goods_issue_note_line";
import type { GoodsIssueNote } from "../domain/goods_issue_note";
import type { Purpose } from "@frontend/models/purpose";

export class GoodsIssueService {
    async new(goodsIssueNote: GoodsIssueNote) {
        const data = this.#toGoodsIssueDTO(goodsIssueNote);

        return await $fetch("/api/goods-issue", {
            method: "post",
            body: { data },
        });
    }

    async getById(id: string): Promise<GoodsIssueNoteModel> {
        return await $fetch(`/api/goods-issue/${id}`, { method: "get" });
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
            total: note.formattedGrossTotal.replace(/\s/, ""),
            returnDate: note.returnDate,
            purpose: note.purpose,
            lines: note.lines.map(this.#toGoodsIssueLine),
        };
    }
}

interface GoodsIssueLineDTO {
    itemId: string;
    quantity: number;
    condition?: Condition;
}

interface GoodsIssueDTO {
    total: string;
    returnDate: string;
    lines: GoodsIssueLineDTO[];
    purpose: Purpose;
}
