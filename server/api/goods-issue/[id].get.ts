import { toGoodsIssueNoteDTO } from "./goods_issue_note_dto";
import { makeServices } from "~/lib/backend/main";
import { HttpStatus } from "../http_status";

const { goodsIssueService } = makeServices();

export default defineEventHandler(async (event) => {
    const noteId = getRouterParam(event, "id", { decode: true });

    if (!noteId) {
        throw createError({
            statusMessage: "ID da Guia de Saída não informado.",
            statusCode: HttpStatus.BadRequest,
        });
    }

    const noteOrErr = await goodsIssueService.get(noteId);

    if (noteOrErr.isLeft()) {
        throw createError({
            statusMessage: "Guia de saída não encontrada.",
            statusCode: HttpStatus.NotFound,
        });
    }

    return toGoodsIssueNoteDTO(noteOrErr.value);
});
