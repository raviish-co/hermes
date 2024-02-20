import { InsufficientStock } from "@backend/domain/catalog/insufficient_item_stock_error";
import { ItemCategoryNotFound } from "@backend/domain/catalog/item_category_not_found_error";
import { PurposeNotFound } from "@backend/domain/goods_issue/purpose_not_found_error";
import { InvalidTotal } from "@backend/domain/goods_issue/invalid_total_error";
import { HttpStatus } from "~/server/api/http_status";
import { makeServices } from "@backend/main";

const { goodsIssueService } = makeServices();

export default defineEventHandler(async (event) => {
    const { request } = await readBody(event);

    console.log(request);

    const voidOrError = await goodsIssueService.new(request);

    if (voidOrError.value instanceof PurposeNotFound) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: voidOrError.value.message,
        });
    }

    if (voidOrError.value instanceof ItemCategoryNotFound) {
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