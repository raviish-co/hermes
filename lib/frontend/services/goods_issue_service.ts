import type { GoodsIssueModel, GoodsIssueLine } from "@frontend/models/goods_issue";
import type { Condition } from "../models/condition";
import type { PurposeSpecification } from "../models/purpose_specification";

interface Line {
    itemId: string;
    quantity: number;
    condition?: Condition;
}

interface GoodsIssueDTO {
    total: string;
    returnDate: string;
    purposeSpecification: PurposeSpecification;
    lines: Line[];
}

export class GoodsIssueService {
    async new(goodsIssue: GoodsIssueModel) {
        const data = this.#toGoodsIssueDTO(goodsIssue);

        return await $fetch("/api/goods-issue", {
            method: "post",
            body: { data },
        });
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

    #toGoodsIssueDTO(goodsIssue: GoodsIssueModel): GoodsIssueDTO {
        return {
            total: goodsIssue.total.replace(/\s/g, ""),
            returnDate: goodsIssue.returnDate,
            purposeSpecification: goodsIssue.purposeSpecification,
            lines: goodsIssue.lines.map(this.#toGoodsIssueLine),
        };
    }
}
