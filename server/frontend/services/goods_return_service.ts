import type { GoodsReturnNoteModel } from "../models/goods_return_note";
import type { NoteLine } from "../domain/note_line";

import { useAuth } from "@app/composables/useAuth";

const auth = useAuth();

export class GoodsReturnService {
    async new(noteId: string, securityDepositWithheld: number, lines: NoteLine[]) {
        const data: GoodsReturnDTO = {
            noteId,
            securityDepositWithheld,
            items: lines.map(this.#toItemDTO),
        };

        return await $fetch("/api/goods-return", {
            method: "post",
            body: data,
            headers: await this.#headers(),
        });
    }

    async getById(noteId: string): Promise<GoodsReturnNoteModel> {
        const response = await $fetch<GoodsReturnNoteModel>(`/api/goods-return/${noteId}`, {
            method: "get",
            headers: await this.#headers(),
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
            headers: await this.#headers(),
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
            goodQuantities: line.goodQuantitiesReturned,
            badQuantities: line.badQuantitiesReturned,
            comment: line.condition?.comment,
        };
    }

    async #headers() {
        return {
            "X-Access-Token": await auth.getAccessToken(),
        };
    }
}

interface ItemDTO {
    itemId: string;
    goodQuantities: number;
    badQuantities?: number;
    comment?: string;
}

interface GoodsReturnDTO {
    noteId: string;
    securityDepositWithheld: number;
    items: ItemDTO[];
}
