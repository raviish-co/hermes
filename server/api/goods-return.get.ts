import { GoodsReturnNoteLine } from "~/lib/backend/domain/goods_return/goods_return_note_line";
import { GoodsReturnNote } from "~/lib/backend/domain/goods_return/goods_return_note";
import { makeServices } from "~/lib/backend/main";

const { goodsReturnService } = makeServices();

interface GoodsReturnNoteDTO {
    goodsIssueNoteId: string;
    goodsReturnNoteId: string;
    securityDepositWithHeld: number;
    issuedAt: string;
    lines: GoodsReturnNoteLineDTO[];
}

interface GoodsReturnNoteLineDTO {
    returnLineId: string;
    itemId: string;
    quantity: string;
}

function toGoodsReturnNoteDTO(note: GoodsReturnNote): GoodsReturnNoteDTO {
    return {
        goodsIssueNoteId: note.goodsIssueNoteId.toString(),
        goodsReturnNoteId: note.goodsReturnNoteId.toString(),
        securityDepositWithHeld: note.securityDepositWithheld.value,
        issuedAt: note.issuedAt.toISOString(),
        lines: note.goodsReturnLines.map(toGoodsReturnNoteLineDTO),
    };
}

function toGoodsReturnNoteLineDTO(line: GoodsReturnNoteLine): GoodsReturnNoteLineDTO {
    return {
        returnLineId: line.returnLineId.toString(),
        itemId: line.itemId.toString(),
        quantity: line.quantityReturned.toString(),
    };
}

export default defineEventHandler(async (event) => {
    const result = await goodsReturnService.list();
    return result.map(toGoodsReturnNoteDTO);
});
