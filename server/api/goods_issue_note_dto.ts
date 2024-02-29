import { GoodsIssueLine } from "~/lib/backend/domain/goods_issue/goods_issue_line";
import { GoodsIssueNote } from "~/lib/backend/domain/goods_issue/goods_issue_note";
import { Purpose } from "~/lib/backend/domain/goods_issue/purpose";

interface GoodsIssueLineDTO {
    name: string;
    itemId: string;
    quantity: number;
    fulltext: string;
    variations: string[];
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
        itemId: line.item.itemId.toString(),
        quantity: line.quantity,
        name: line.item.name,
        fulltext: line.item.fulltext,
        variations: Object.values(line.item.variations).map((variation) => variation.toString()),
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
