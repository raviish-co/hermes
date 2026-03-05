import { useGoodsIssueService } from "@app/composables/useGoodsIssueService";
import { GoodsIssueNoteNotFound } from "@backend/domain/goods_issue/goods_issue_note_not_found_error";
import { checkAnonymousUser } from "../check_anonymous_user";
import { HttpStatus } from "../http_status";
import { toGoodsIssueNoteDTO } from "./goods_issue_note_dto";
import { defineSafeEventHandler } from "~~/server/utils/handler";

const service = useGoodsIssueService();

export default defineSafeEventHandler(async (event) => {
    checkAnonymousUser(event);

    const noteId = getRouterParam(event, "id", { decode: true });

    if (!noteId) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "ID da guia de saída não informado",
        });
    }

    const noteOrErr = await service.get(noteId);

    if (noteOrErr.value instanceof GoodsIssueNoteNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            message: "Guia de saída não encontrada",
        });
    }

    if (noteOrErr.isLeft()) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            message: "Erro ao buscar guia de saída",
        });
    }

    return { data: toGoodsIssueNoteDTO(noteOrErr.value) };
});
