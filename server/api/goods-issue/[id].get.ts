import { toGoodsIssueNoteDTO } from "../goods_issue_note_dto";
import { makeServices } from "~/lib/backend/main";
import { HttpStatus } from "../http_status";

const { goodsIssueService } = makeServices();

export default defineEventHandler(async (event) => {
    const goodsIssueNoteId = getRouterParam(event, "id", { decode: true });

    if (!goodsIssueNoteId) {
        return createError({
            message: "goods issue note id is required",
            status: HttpStatus.BadRequest,
        });
    }

    const goodsIssueNoteOrErr = await goodsIssueService.get(goodsIssueNoteId);

    if (goodsIssueNoteOrErr.isLeft()) {
        return createError({
            message: goodsIssueNoteOrErr.value.message,
            status: HttpStatus.NotFound,
        });
    }

    return toGoodsIssueNoteDTO(goodsIssueNoteOrErr.value);
});
