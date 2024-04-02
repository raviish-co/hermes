import { InsufficientStock } from "~/lib/backend/domain/catalog/items/insufficient_stock_error";
import { ItemNotFound } from "~/lib/backend/domain/catalog/items/item_not_found_error";
import { InvalidPurpose } from "~/lib/backend/domain/goods_issue/invalid_purpose_error";
import { InvalidTotal } from "~/lib/backend/domain/goods_issue/invalid_total_error";
import { HttpStatus } from "~/server/api/http_status";
import { makeServices } from "~/lib/backend/main";

const { goodsIssueService } = makeServices();

export default defineEventHandler(async (event) => {
    const { data } = await readBody(event);

    const voidOrErr = await goodsIssueService.new(data);

    if (voidOrErr.value instanceof InvalidPurpose) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: "Finalidade inválida",
        });
    }

    if (voidOrErr.value instanceof ItemNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            statusMessage: "Artigo não encontrado",
        });
    }

    if (voidOrErr.value instanceof InvalidTotal) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: "Total da Guia é inválido",
        });
    }

    if (voidOrErr.value instanceof InsufficientStock) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: "Stock insuficiente",
        });
    }

    if (voidOrErr.isLeft()) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            statusMessage: "Erro ao efetuar a saída de artigos",
        });
    }

    setResponseStatus(event, HttpStatus.Created);

    return { message: "Saída de Artigos efetuada com sucesso" };
});