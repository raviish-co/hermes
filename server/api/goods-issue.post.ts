import { InsufficientStock } from "@backend/domain/catalog/insufficient_stock_error";
import { ItemNotFound } from "@backend/domain/catalog/item_not_found_error";
import { InvalidPurpose } from "~/lib/backend/domain/goods_issue/invalid_purpose_error";
import { InvalidTotal } from "@backend/domain/goods_issue/invalid_total_error";
import { HttpStatus } from "~/server/api/http_status";
import { makeServices } from "@backend/main";

const { goodsIssueService } = makeServices();

export default defineEventHandler(async (event) => {
    const { data } = await readBody(event);

    const voidOrError = await goodsIssueService.new(data);

    if (voidOrError.value instanceof InvalidPurpose) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: voidOrError.value.message,
        });
    }

    if (voidOrError.value instanceof ItemNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            message: voidOrError.value.message,
        });
    }

    if (voidOrError.value instanceof InvalidTotal) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: voidOrError.value.message,
        });
    }

    if (voidOrError.value instanceof InsufficientStock) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: voidOrError.value.message,
        });
    }

    setResponseStatus(event, HttpStatus.Created);

    return { message: "Saída de Artigos efetuada com sucesso" };
});
