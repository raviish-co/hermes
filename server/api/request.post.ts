import { InsufficientStockItem } from "../backend/domain/sequences/insufficient_item_stock_error";
import { PurposeNotFound } from "../backend/domain/purposes/purpose_not_found_error";
import { ItemNotFound } from "../backend/domain/catalog/item_not_found_error";
import { InvalidTotal } from "../backend/domain/requests/invalid_total_error";
import { HttpStatus } from "../backend/shared/http_status";
import { RequestData } from "~/lib/models/request";
import { makeServices } from "../backend/main";

const { requestService } = makeServices();

export default defineEventHandler(async (event) => {
    const { request } = await readBody<{ request: RequestData }>(event);

    const voidOrError = await requestService.requestItems(request);

    if (voidOrError.value instanceof PurposeNotFound) {
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

    if (voidOrError.value instanceof InsufficientStockItem) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: voidOrError.value.message,
        });
    }

    setResponseStatus(event, HttpStatus.Created);

    return { statusCode: 200, message: "Solicitação efetuada com sucesso" };
});
