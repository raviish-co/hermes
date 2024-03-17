import { ReturnNoteLine } from "../domain/return_note_line";

export class GoodsReturnService {
    async new(goodsIssueNoteId: string, retainedSecurityDeposit: string, lines: ReturnNoteLine[]) {
        const data: GoodsReturnDTO = {
            goodsIssueNoteId,
            securityDepositWithHeld: retainedSecurityDeposit,
            itemsData: lines.map(this.#toItemDTO),
        };

        return await $fetch("/api/goods-return", { method: "post", body: data });
    }

    #toItemDTO(line: ReturnNoteLine): ItemDTO {
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
    securityDepositWithHeld: string;
    itemsData: ItemDTO[];
}
