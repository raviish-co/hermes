import { InsufficientStock } from "@backend/domain/catalog/insufficient_stock_error";
import { ItemNotFound } from "@backend/domain/catalog/item_not_found_error";
import { InvalidPurpose } from "~/lib/backend/domain/goods_issue/invalid_purpose_error";
import { InvalidTotal } from "@backend/domain/goods_issue/invalid_total_error";
import { HttpStatus } from "~/server/api/http_status";
import { makeServices } from "@backend/main";

const { goodsIssueService } = makeServices();

export default defineEventHandler(async (event) => {
    const { data } = await readBody(event);

    const voidOrErr = await goodsIssueService.new(data);

    if (voidOrErr.value instanceof InvalidPurpose) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: voidOrErr.value.message,
        });
    }

    if (voidOrErr.value instanceof ItemNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            statusMessage: voidOrErr.value.message,
        });
    }

    if (voidOrErr.value instanceof InvalidTotal) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: voidOrErr.value.message,
        });
    }

    if (voidOrErr.value instanceof InsufficientStock) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: voidOrErr.value.message,
        });
    }

    setResponseStatus(event, HttpStatus.Created);

    return { message: "Saída de Artigos efetuada com sucesso" };
});
