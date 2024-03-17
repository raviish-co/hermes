import { GoodsIssueLine } from "~/lib/backend/domain/goods_issue/goods_issue_line";
import { GoodsIssueNote } from "~/lib/backend/domain/goods_issue/goods_issue_note";
import { Purpose } from "~/lib/backend/domain/goods_issue/purpose";
import { toVariationValuesDTO } from "./item_dto";

interface VariationValues {
    variationId: string;
    value: string;
}

interface GoodsIssueLineDTO {
    itemId: string;
    name: string;
    price: string;
    quantity: number;
    quantityReturned: number;
    fulltext: string;
    variationValues: VariationValues[];
}

interface GoodsIssueNoteDTO {
    goodsIssueNoteId: string;
    purpose: Purpose;
    total: string;
    securityDeposit: string;
    returnDate: string;
    status: string;
    lines: GoodsIssueLineDTO[];
}

function toGoodsIssueLineDTO(line: GoodsIssueLine): GoodsIssueLineDTO {
    return {
        itemId: line.itemId.toString(),
        name: line.name,
        price: line.price.value.toString(),
        quantity: line.quantityRequested,
        quantityReturned: line.quantityReturned,
        fulltext: line.fulltext,
        variationValues: toVariationValuesDTO(line.variationsValues),
    };
}

export function toGoodsIssueNoteDTO(note: GoodsIssueNote): GoodsIssueNoteDTO {
    return {
        goodsIssueNoteId: note.goodsIssueNoteId.toString(),
        purpose: note.purpose,
        status: note.status,
        lines: note.goodsIssueLines.map(toGoodsIssueLineDTO),
        returnDate: note.returnDate.toISOString(),
        total: note.total.value.toString(),
        securityDeposit: note.securityDeposit.value.toString(),
    };
}
