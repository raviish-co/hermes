import type { GoodsReturnNoteModel } from "../models/goods_return_note";
import type { NoteLine } from "../domain/note_line";

const auth = useAuth();

export class GoodsReturnService {
    async new(
        noteId: string,
        securityDepositWithHeld: number,
        lines: NoteLine[],
    ) {
        const data: GoodsReturnDTO = {
            noteId,
            securityDepositWithHeld,
            itemsData: lines.map(this.#toItemDTO),
            userId: auth.getUsername(),
        };

        return await $fetch("/api/goods-return", {
            method: "post",
            body: data,
            headers: this.headers,
        });
    }

    async getById(noteId: string): Promise<GoodsReturnNoteModel> {
        const response = await $fetch<GoodsReturnNoteModel>(
            `/api/goods-return/${noteId}`,
            {
                method: "get",
                headers: this.headers,
            },
        );

        return {
            goodsIssueNoteId: response.goodsIssueNoteId,
            goodsReturnNoteId: response.goodsReturnNoteId,
            issuedAt: response.issuedAt,
            securityDepositWithHeld: response.securityDepositWithHeld,
            lines: response.lines,
        };
    }

    async list(): Promise<GoodsReturnNoteModel[]> {
        const response = await $fetch<GoodsReturnNoteModel[]>(
            `/api/goods-return`,
            {
                method: "get",
                headers: this.headers,
            },
        );

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

    get headers() {
        return {
            "X-Access-Token": auth.getToken(),
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
    securityDepositWithHeld: number;
    itemsData: ItemDTO[];
    userId: string;
}
