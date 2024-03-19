import { GoodsReturnNoteLine } from "../domain/goods_return_note_line";

export class GoodsReturnService {
    async new(
        goodsIssueNoteId: string,
        securityDepositWithHeld: number,
        lines: GoodsReturnNoteLine[]
    ) {
        const data: GoodsReturnDTO = {
            goodsIssueNoteId,
            securityDepositWithHeld,
            itemsData: lines.map(this.#toItemDTO),
        };

        return await $fetch("/api/goods-return", { method: "post", body: data });
    }

    #toItemDTO(line: GoodsReturnNoteLine): ItemDTO {
        return {
            itemId: line.itemId,
            quantity: line.quantity,
            comment: line.condition?.comment,
        };
    }
}

interface ItemDTO {
    itemId: string;
    quantity: number;
    comment?: string;
}

interface GoodsReturnDTO {
    goodsIssueNoteId: string;
    securityDepositWithHeld: number;
    itemsData: ItemDTO[];
}
