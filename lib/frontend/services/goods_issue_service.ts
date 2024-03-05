import type { Condition } from "../models/condition";
import type { PurposeSpecification } from "../models/purpose_specification";
import type { GoodsIssueLine, GoodsIssue } from "../models/goods_issue";
import type { GoodsIssueNoteModel } from "../models/goods_issue_note";

interface Line {
    itemId: string;
    quantity: number;
    condition?: Condition;
}

interface GoodsIssueDTO {
    total: string;
    returnDate: string;
    purpose: PurposeSpecification;
    lines: Line[];
}

export class GoodsIssueService {
    async new(goodsIssue: GoodsIssue) {
        const data = this.#toGoodsIssueDTO(goodsIssue);

        return await $fetch("/api/goods-issue", {
            method: "post",
            body: { data },
        });
    }

    async getById(id: string): Promise<GoodsIssueNoteModel> {
        return await $fetch(`/api/goods-issue/${id}`, { method: "get" });
    }

    #toGoodsIssueLine(line: GoodsIssueLine): Line {
        return {
            itemId: line.itemId,
            quantity: line.quantity,
            condition: {
                comment: line?.condition?.comment,
                status: line?.condition!.status,
            },
        };
    }

    #toGoodsIssueDTO(goodsIssue: GoodsIssue): GoodsIssueDTO {
        return {
            total: goodsIssue.total.replace(/\s/g, ""),
            returnDate: goodsIssue.returnDate,
            purpose: goodsIssue.purposeSpecification,
            lines: goodsIssue.lines.map(this.#toGoodsIssueLine),
        };
    }
}
