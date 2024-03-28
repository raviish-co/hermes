import type { GoodsReturnNoteModel } from "../models/goods_return_note";
import type { NoteLine } from "../domain/note_line";

export class GoodsReturnService {
    async new(noteId: string, securityDepositWithHeld: number, lines: NoteLine[]) {
        const data: GoodsReturnDTO = {
            noteId,
            securityDepositWithHeld,
            itemsData: lines.map(this.#toItemDTO),
        };

        return await $fetch("/api/goods-return", { method: "post", body: data });
    }

    async getById(noteId: string): Promise<GoodsReturnNoteModel> {
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

        return response.map((data) => ({
            goodsIssueNoteId: data.goodsIssueNoteId,
            goodsReturnNoteId: data.goodsReturnNoteId,
            issuedAt: data.issuedAt,
            securityDepositWithHeld: data.securityDepositWithHeld,
            lines: data.lines,
        }));
    }

    #toItemDTO(line: NoteLine): ItemDTO {
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
    noteId: string;
    securityDepositWithHeld: number;
    itemsData: ItemDTO[];
}
