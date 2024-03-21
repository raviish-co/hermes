import { GoodsReturnNoteLine } from "../domain/goods_return_note_line";
import type { GoodsReturnNoteModel } from "../models/goods_return_note";

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

    async get(noteId: string): Promise<GoodsReturnNoteModel> {
        const response = await $fetch<GoodsReturnNoteModel>(`/api/goods-return/${noteId}`, {
            method: "get",
        });

        return {
            goodsIssueNoteId: response.goodsIssueNoteId,
            goodsReturnNoteId: response.goodsReturnNoteId,
            issuedAt: response.issuedAt,
            securityDepositWithHeld: response.securityDepositWithHeld,
            lines: response.lines,
        };
    }

    async list(): Promise<GoodsReturnNoteModel[]> {
        const response = await $fetch<GoodsReturnNoteModel[]>(`/api/goods-return`, {
            method: "get",
        });

        return response.map((note) => ({
            goodsIssueNoteId: note.goodsIssueNoteId,
            goodsReturnNoteId: note.goodsReturnNoteId,
            issuedAt: note.issuedAt,
            securityDepositWithHeld: note.securityDepositWithHeld,
            lines: note.lines,
        }));
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
