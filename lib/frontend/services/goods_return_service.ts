import type { GoodsIssueLine } from "../models/goods_issue_note";

interface ItemDTO {
    itemId: string;
    quantity: number;
    comment?: string;
}

interface GoodsReturnDTO {
    goodsIssueNoteId: string;
    securityDepositWithHeld: string;
    itemsData: ItemDTO[];
}

export class GoodsReturnService {
    async new(goodsIssueNoteId: string, retainedSecurityDeposit: string, lines: GoodsIssueLine[]) {
        const data: GoodsReturnDTO = {
            goodsIssueNoteId,
            securityDepositWithHeld: retainedSecurityDeposit,
            itemsData: lines.map(this.#toItemDTO),
        };

        return await $fetch("/api/goods-return", { method: "post", body: data });
    }

    #toItemDTO(line: GoodsIssueLine): ItemDTO {
        return {
            itemId: line.itemId,
            quantity: line.quantity,
            comment: line.condition?.comment,
        };
    }
}
