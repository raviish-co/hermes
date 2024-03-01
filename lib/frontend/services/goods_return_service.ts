import type { GoodsIssueLineBase } from "../models/goods_issue_base";

interface ItemDTO {
    itemId: string;
    quantity: number;
    comment?: string;
}

interface NewGoodsReturnData {
    goodsIssueNoteId: string;
    securityDepositWithHeld: string;
    itemsData: ItemDTO[];
}

export class GoodsReturnService {
    async new(goodsIssueId: string, retainedSecurityDeposit: string, lines: GoodsIssueLineBase[]) {
        const data: NewGoodsReturnData = {
            goodsIssueNoteId: goodsIssueId,
            securityDepositWithHeld: retainedSecurityDeposit,
            itemsData: lines.map(this.#toItemDTO),
        };

        return await $fetch("/api/goods-return", { method: "post", body: data });
    }

    #toItemDTO(line: GoodsIssueLineBase): ItemDTO {
        return {
            itemId: line.itemId,
            quantity: line.quantity,
            comment: line.condition?.comment,
        };
    }
}
