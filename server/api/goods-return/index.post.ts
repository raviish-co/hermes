import { useGoodsReturnService } from "@app/composables/useGoodsReturnService";
import { GoodsIssueNoteHasBeenReturned } from "@backend/domain/goods_issue/goods_issue_note_has_been_returned_error";
import { GoodsIssueNoteNotFound } from "@backend/domain/goods_issue/goods_issue_note_not_found_error";
import { GoodsIssueLineNotFound } from "@backend/domain/goods_issue/goods_lssue_line_not_found_error";
import { InvalidGoodsIssueLineQuantity } from "@backend/domain/goods_issue/invalid_goods_issue_line_quantity_error";
import { checkAnonymousUser } from "../check_anonymous_user";
import { HttpStatus } from "../http_status";
import { NoteDTO } from "@backend/application/goods_return_service";
import { defineSafeEventHandler } from "~~/server/utils/handler";

const service = useGoodsReturnService();

export default defineSafeEventHandler(async (event) => {
    checkAnonymousUser(event);

    const { noteId, securityDepositWithheld, items } = await readBody(event);

    const dto: NoteDTO = {
        noteId,
        securityDepositWithheld,
        items,
        userId: event.context.username,
    };

    const voidOrErr = await service.returningGoods(dto);

    if (voidOrErr.value instanceof GoodsIssueNoteNotFound) {
        throw createError({
            message: "Guia de saída não encontrada.",
            statusCode: HttpStatus.NotFound,
        });
    }

    if (voidOrErr.value instanceof InvalidGoodsIssueLineQuantity) {
        throw createError({
            message: "Quantidade inválida.",
            statusCode: HttpStatus.BadRequest,
        });
    }

    if (voidOrErr.value instanceof GoodsIssueNoteHasBeenReturned) {
        throw createError({
            message: "Guia de saida já foi devolvida.",
            statusCode: HttpStatus.BadRequest,
        });
    }

    if (voidOrErr.value instanceof GoodsIssueLineNotFound) {
        throw createError({
            message: "Artigo para devolução não encontrado.",
            statusCode: HttpStatus.NotFound,
        });
    }

    if (voidOrErr instanceof Error) {
        throw createError({
            message: "Erro ao registar a devolução.",
            statusCode: HttpStatus.ServerError,
        });
    }

    setResponseStatus(event, HttpStatus.Created);

    return { message: "Devolução efetuada com sucesso" };
});
