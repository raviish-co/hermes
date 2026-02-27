import { useGoodsIssueService } from "@app/composables/useGoodsIssueService";
import { GoodsIssueNoteNotFound } from "@backend/domain/goods_issue/goods_issue_note_not_found_error";
import { checkAnonymousUser } from "../check_anonymous_user";
import { HttpStatus } from "../http_status";
import { toGoodsIssueNoteDTO } from "./goods_issue_note_dto";

const service = useGoodsIssueService();

export default defineEventHandler(async (event) => {
    checkAnonymousUser(event);

    const noteId = getRouterParam(event, "id", { decode: true });

    if (!noteId) {
        return new Response(
            JSON.stringify({
                message: "ID da Guia de Saida nao informado.",
            }),
            {
                status: HttpStatus.BadRequest,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
    }

    const noteOrErr = await service.get(noteId);

    if (noteOrErr.value instanceof GoodsIssueNoteNotFound) {
        return new Response(
            JSON.stringify({
                message: "Guia de saida nao encontrada.",
            }),
            {
                status: HttpStatus.NotFound,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
    }

    if (noteOrErr.isLeft()) {
        return new Response(
            JSON.stringify({
                message: "Erro ao buscar guia de saida.",
            }),
            {
                status: HttpStatus.ServerError,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
    }

    return { data: toGoodsIssueNoteDTO(noteOrErr.value) };
});
