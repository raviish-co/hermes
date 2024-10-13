import { useGoodsReturnService } from "~/composables/useGoodsReturnService";
import { GoodsIssueNoteHasBeenReturned } from "~/lib/backend/domain/goods_issue/goods_issue_note_has_been_returned_error";
import { GoodsIssueNoteNotFound } from "~/lib/backend/domain/goods_issue/goods_issue_note_not_found_error";
import { GoodsIssueLineNotFound } from "~/lib/backend/domain/goods_issue/goods_lssue_line_not_found_error";
import { InvalidGoodsIssueLineQuantity } from "~/lib/backend/domain/goods_issue/invalid_goods_issue_line_quantity_error";
import { checkAnonymousUser } from "../check_anonymous_user";
import { HttpStatus } from "../http_status";

const service = useGoodsReturnService();

export default defineEventHandler(async (event) => {
    checkAnonymousUser(event);

    const { noteId, securityDepositWithHeld, itemsData } = await readBody(
        event,
    );

    const voidOrErr = await service.returningGoods(
        noteId,
        securityDepositWithHeld,
        itemsData,
    );

    if (voidOrErr.value instanceof GoodsIssueNoteNotFound) {
        throw createError({
            statusMessage: "Guia de saida nao encontrada.",
            statusCode: HttpStatus.NotFound,
        });
    }

    if (voidOrErr.value instanceof InvalidGoodsIssueLineQuantity) {
        throw createError({
            statusMessage: "Quantidade invalida.",
            statusCode: HttpStatus.BadRequest,
        });
    }

    if (voidOrErr.value instanceof GoodsIssueNoteHasBeenReturned) {
        throw createError({
            statusMessage: "Guia de saida ja foi devolvida.",
            statusCode: HttpStatus.BadRequest,
        });
    }

    if (voidOrErr.value instanceof GoodsIssueLineNotFound) {
        throw createError({
            statusMessage: "Artigo para devolucao nao encontrado.",
            statusCode: HttpStatus.NotFound,
        });
    }

    if (voidOrErr instanceof Error) {
        throw createError({
            statusMessage: "Erro ao registrar a devolucao.",
            statusCode: HttpStatus.ServerError,
        });
    }

    setResponseStatus(event, HttpStatus.Created);

    return { message: "Devolucao efetuada com sucesso." };
});
