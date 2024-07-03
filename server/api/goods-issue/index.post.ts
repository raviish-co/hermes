import { useGoodsIssueService } from "~/composables/useGoodsIssueService";
import { InsufficientStock } from "~/lib/backend/domain/catalog/items/insufficient_stock_error";
import { ItemNotFound } from "~/lib/backend/domain/catalog/items/item_not_found_error";
import { InvalidPurpose } from "~/lib/backend/domain/goods_issue/invalid_purpose_error";
import { InvalidTotal } from "~/lib/backend/domain/goods_issue/invalid_total_error";
import { HttpStatus } from "~/server/api/http_status";

const service = useGoodsIssueService();

export default defineEventHandler(async (event) => {
    const { data } = await readBody(event);

    const voidOrErr = await service.new(data);

    if (voidOrErr.value instanceof InvalidPurpose) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: "Finalidade invalida",
        });
    }

    if (voidOrErr.value instanceof ItemNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            statusMessage: "Artigo nao encontrado",
        });
    }

    if (voidOrErr.value instanceof InvalidTotal) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: "Total da guia de saida invalido",
        });
    }

    if (voidOrErr.value instanceof InsufficientStock) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: "Stock insuficiente",
        });
    }

    if (voidOrErr instanceof Error) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            statusMessage: "Erro ao efetuar a saida de artigos",
        });
    }

    setResponseStatus(event, HttpStatus.Created);

    return { message: "Saída de Artigos efetuada com sucesso" };
});
