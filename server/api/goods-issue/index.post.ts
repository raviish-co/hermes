import { useGoodsIssueService } from "@app/composables/useGoodsIssueService";
import { InsufficientStock } from "@backend/domain/catalog/items/insufficient_stock_error";
import { ItemNotFound } from "@backend/domain/catalog/items/item_not_found_error";
import { InvalidPurpose } from "@backend/domain/goods_issue/invalid_purpose_error";
import { InvalidTotal } from "@backend/domain/goods_issue/invalid_total_error";
import { HttpStatus } from "../http_status";
import { checkAnonymousUser } from "../check_anonymous_user";

const service = useGoodsIssueService();

export default defineEventHandler(async (event) => {
    checkAnonymousUser(event);

    const { userId, purpose, lines, total, returnDate } = await readBody(event);

    const voidOrErr = await service.new({
        userId,
        purpose,
        lines,
        total,
        returnDate,
    });

    if (voidOrErr.value instanceof InvalidPurpose) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "A finalidade informada é inválida",
        });
    }

    if (voidOrErr.value instanceof ItemNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            message: "Artigo não encontrado",
        });
    }

    if (voidOrErr.value instanceof InvalidTotal) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "Total da guia de saída inválido",
        });
    }

    if (voidOrErr.value instanceof InsufficientStock) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "Stock insuficiente",
        });
    }

    if (voidOrErr instanceof Error) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            message: "Erro ao efetuar a saida de artigos",
        });
    }

    setResponseStatus(event, HttpStatus.Created);

    return { message: "Saída de Artigos efetuada com sucesso" };
});
