import { GoodsIssueLine } from "~/lib/backend/domain/goods_issue/goods_issue_line";
import { GoodsIssueNote } from "~/lib/backend/domain/goods_issue/goods_issue_note";
import { Purpose } from "~/lib/backend/domain/goods_issue/purpose";

interface GoodsIssueLineDTO {
    itemId: string;
    quantity: number;
    returnedQuantity: number;
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
        quantity: line.quantityRequested,
        returnedQuantity: line.quantityReturned,

        // name: line.item.name,
        // fulltext: line.item.fulltext,
        // variationValues: Object.values(line.item.variations).map((variation) =>
        //     variation.toString()
        // ),
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
