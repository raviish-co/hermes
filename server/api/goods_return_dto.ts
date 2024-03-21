import { GoodsReturnNoteLine } from "~/lib/backend/domain/goods_return/goods_return_note_line";
import { GoodsReturnNote } from "~/lib/backend/domain/goods_return/goods_return_note";
import { toVariationValuesDTO } from "./item_dto";

interface VariationValues {
    variationId: string;
    value: string;
}

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
    name: string;
    quantity: string;
    variationValues: VariationValues[];
    condition: {
        status: string;
        comment?: string;
    };
}

export function toGoodsReturnNoteDTO(note: GoodsReturnNote): GoodsReturnNoteDTO {
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
        name: line.name,
        variationValues: toVariationValuesDTO(line.variationsValues),
        condition: line.condition,
    };
}
