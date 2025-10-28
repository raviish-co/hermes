import { GoodsIssueNoteLine } from "@backend/domain/goods_issue/goods_issue_note_line";
import { GoodsIssueNote } from "@backend/domain/goods_issue/goods_issue_note";
import { Purpose } from "@backend/domain/goods_issue/purpose";
import { toVariationValuesDTO } from "../items/item_dto";
import { Condition } from "@backend/shared/condition";

interface VariationValues {
    variationId: string;
    value: string;
}

interface GoodsIssueLineDTO {
    itemId: string;
    name: string;
    price: number;
    quantityRequested: number;
    quantityReturned: number;
    quantityToReturn: number;
    goodQuantities: number;
    badQuantities: number;
    goodQuantitiesReturned: number;
    badQuantitiesReturned: number;
    variationValues: VariationValues[];
    condition?: Condition;
}

interface GoodsIssueNoteDTO {
    goodsIssueNoteId: string;
    purpose: Purpose;
    total: number;
    securityDeposit: number;
    returnDate: string;
    status: string;
    lines: GoodsIssueLineDTO[];
}

function toGoodsIssueLineDTO(line: GoodsIssueNoteLine): GoodsIssueLineDTO {
    return {
        itemId: line.itemId.toString(),
        name: line.name,
        price: line.price.value,
        goodQuantities: line.goodQuantities,
        badQuantities: line.badQuantities,
        goodQuantitiesReturned: line.goodQuantitiesReturned,
        badQuantitiesReturned: line.badQuantitiesReturned,
        quantityRequested: line.total,
        quantityReturned: line.quantityReturned,
        quantityToReturn: line.maxToReturn,
        variationValues: toVariationValuesDTO(line.variationsValues),
        condition: line.condition,
    };
}

export function toGoodsIssueNoteDTO(note: GoodsIssueNote): GoodsIssueNoteDTO {
    return {
        goodsIssueNoteId: note.noteId.toString(),
        purpose: note.purpose,
        status: note.status,
        lines: note.lines.map(toGoodsIssueLineDTO),
        returnDate: note.returnDate.toISOString(),
        total: note.total.value,
        securityDeposit: note.securityDeposit.value,
    };
}
