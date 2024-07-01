import { useGoodsReturnService } from "~/composables/useGoodsReturnService";
import { GoodsIssueNoteHasBeenReturned } from "~/lib/backend/domain/goods_issue/goods_issue_note_has_been_returned_error";
import { GoodsIssueNoteNotFound } from "~/lib/backend/domain/goods_issue/goods_issue_note_not_found_error";
import { InvalidGoodsIssueLineQuantity } from "~/lib/backend/domain/goods_issue/invalid_goods_issue_line_quantity_error";
import { HttpStatus } from "../http_status";

const goodsReturnService = useGoodsReturnService();

export default defineEventHandler(async (event) => {
    const { noteId, securityDepositWithHeld, itemsData } = await readBody(event);

    const voidOrErr = await goodsReturnService.returningGoods(
        noteId,
        securityDepositWithHeld,
        itemsData
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

    if (voidOrErr.isLeft()) {
        throw createError({
            statusMessage: "Erro ao registrar a devolucao.",
            statusCode: HttpStatus.ServerError,
        });
    }

    setResponseStatus(event, HttpStatus.Created);

    return { message: "Devolucao efetuada com sucesso." };
});
