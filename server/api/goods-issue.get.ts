import { GoodsIssueLine } from "~/lib/backend/domain/goods_issue/goods_issue_line";
import { GoodsIssueNote } from "~/lib/backend/domain/goods_issue/goods_issue_note";
import { makeServices } from "~/lib/backend/main";

const { goodsIssueService } = makeServices();

interface GoodsIssueLineDTO {
    itemId: string;
    quantity: number;
    total: string;
}

interface GoodsIssueNoteDTO {
    goodsIssueNoteId: string;
    total: string;
    securityDeposit: string;
    returnDate: string;
    status: string;
    lines: GoodsIssueLineDTO[];
}

function toGoodsIssueLineDTO(line: GoodsIssueLine): GoodsIssueLineDTO {
    return {
        itemId: line.itemId.toString(),
        quantity: line.quantity,
        total: line.total.value.toString(),
    };
}

function toGoodsIssueNoteDTO(note: GoodsIssueNote): GoodsIssueNoteDTO {
    return {
        goodsIssueNoteId: note.goodsIssueNoteId.toString(),
        total: note.total.value.toString(),
        securityDeposit: note.securityDeposit.value.toString(),
        returnDate: note.returnDate.toISOString(),
        status: note.status,
        lines: note.goodsIssueLines.map(toGoodsIssueLineDTO),
    };
}

export default defineEventHandler(async (event) => {
    const result = await goodsIssueService.list();

    return result.map(toGoodsIssueNoteDTO);
});
