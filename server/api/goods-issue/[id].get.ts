import { toGoodsIssueNoteDTO } from "../goods_issue_note_dto";
import { makeServices } from "~/lib/backend/main";
import { HttpStatus } from "../http_status";

const { goodsIssueService } = makeServices();

export default defineEventHandler(async (event) => {
    const noteId = getRouterParam(event, "id", { decode: true });

    if (!noteId) {
        return createError({
            message: "goods issue note id is required",
            status: HttpStatus.BadRequest,
        });
    }

    const noteOrErr = await goodsIssueService.get(noteId);

    if (noteOrErr.isLeft()) {
        return createError({
            message: noteOrErr.value.message,
            status: HttpStatus.NotFound,
        });
    }

    return toGoodsIssueNoteDTO(noteOrErr.value);
});
