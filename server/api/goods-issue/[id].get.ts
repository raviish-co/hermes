import { useGoodsIssueService } from "~/composables/useGoodsIssueService";
import { GoodsIssueNoteNotFound } from "~/lib/backend/domain/goods_issue/goods_issue_note_not_found_error";
import { HttpStatus } from "../http_status";
import { toGoodsIssueNoteDTO } from "./goods_issue_note_dto";

const goodsIssueService = useGoodsIssueService();

export default defineEventHandler(async (event) => {
    const noteId = getRouterParam(event, "id", { decode: true });

    if (!noteId) {
        throw createError({
            statusMessage: "ID da Guia de Saida nao informado.",
            statusCode: HttpStatus.BadRequest,
        });
    }

    const noteOrErr = await goodsIssueService.get(noteId);

    if (noteOrErr.value instanceof GoodsIssueNoteNotFound) {
        throw createError({
            statusMessage: "Guia de saida nao encontrada.",
            statusCode: HttpStatus.NotFound,
        });
    }

    if (noteOrErr.isLeft()) {
        throw createError({
            statusMessage: "Erro ao buscar guia de saida.",
            statusCode: HttpStatus.ServerError,
        });
    }

    return toGoodsIssueNoteDTO(noteOrErr.value);
});
