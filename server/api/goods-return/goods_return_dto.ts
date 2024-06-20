import { GoodsReturnNoteLine } from "~/lib/backend/domain/goods_return/goods_return_note_line";
import { GoodsReturnNote } from "~/lib/backend/domain/goods_return/goods_return_note";
import { toVariationValuesDTO } from "../items/item_dto";

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
    goodQuantities: number;
    badQuantities: number;
    total: number;
    variationValues: VariationValues[];
    condition: {
        status: string;
        comment?: string;
    };
}

export function toGoodsReturnNoteDTO(note: GoodsReturnNote): GoodsReturnNoteDTO {
    return {
        goodsIssueNoteId: note.goodsIssueNoteId.toString(),
        goodsReturnNoteId: note.noteId.toString(),
        securityDepositWithHeld: note.securityDepositWithheld.value,
        issuedAt: note.issuedAt.toISOString(),
        lines: note.lines.map(toGoodsReturnNoteLineDTO),
    };
}

function toGoodsReturnNoteLineDTO(line: GoodsReturnNoteLine): GoodsReturnNoteLineDTO {
    return {
        returnLineId: line.lineId.toString(),
        itemId: line.itemId.toString(),
        goodQuantities: line.goodQuantities,
        badQuantities: line.badQuantities,
        total: line.total,
        name: line.description,
        variationValues: toVariationValuesDTO(line.variationsValues),
        condition: line.condition,
    };
}
