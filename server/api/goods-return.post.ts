import { GoodsIssueNoteNotFound } from "~/lib/backend/domain/goods_issue/goods_issue_note_not_found_error";
import { makeServices } from "~/lib/backend/main";
import { HttpStatus } from "./http_status";
import { InvalidGoodsIssueLineQuantity } from "~/lib/backend/domain/goods_issue/invalid_goods_issue_line_quantity_error";

const { goodsReturnService } = makeServices();

export default defineEventHandler(async (event) => {
    const { goodsIssueNoteId, securityDepositWithHeld, itemsData } = await readBody(event);

    const result = await goodsReturnService.returningGoods(
        goodsIssueNoteId,
        securityDepositWithHeld,
        itemsData
    );

    if (result instanceof GoodsIssueNoteNotFound) {
        return createError({ message: result.message, statusCode: HttpStatus.BadRequest });
    }

    if (result instanceof InvalidGoodsIssueLineQuantity) {
        return createError({ message: result.message, statusCode: HttpStatus.BadRequest });
    }

    setResponseStatus(event, HttpStatus.Created);
});
