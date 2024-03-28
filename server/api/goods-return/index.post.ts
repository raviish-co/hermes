import { InvalidGoodsIssueLineQuantity } from "~/lib/backend/domain/goods_issue/invalid_goods_issue_line_quantity_error";
import { GoodsIssueNoteHasBeenReturned } from "~/lib/backend/domain/goods_issue/goods_issue_note_has_been_returned_error";
import { GoodsIssueNoteNotFound } from "~/lib/backend/domain/goods_issue/goods_issue_note_not_found_error";
import { makeServices } from "~/lib/backend/main";
import { HttpStatus } from "../http_status";

const { goodsReturnService } = makeServices();

export default defineEventHandler(async (event) => {
    const { noteId, securityDepositWithHeld, itemsData } = await readBody(event);

    const voidOrErr = await goodsReturnService.returningGoods(
        noteId,
        securityDepositWithHeld,
        itemsData
    );

    if (voidOrErr.value instanceof GoodsIssueNoteNotFound) {
        return createError({
            message: voidOrErr.value.message,
            statusCode: HttpStatus.BadRequest,
        });
    }

    if (voidOrErr.value instanceof InvalidGoodsIssueLineQuantity) {
        return createError({
            message: voidOrErr.value.message,
            statusCode: HttpStatus.BadRequest,
        });
    }

    if (voidOrErr.value instanceof GoodsIssueNoteHasBeenReturned) {
        return createError({
            message: voidOrErr.value.message,
            statusCode: HttpStatus.BadRequest,
        });
    }

    setResponseStatus(event, HttpStatus.Created);
});
