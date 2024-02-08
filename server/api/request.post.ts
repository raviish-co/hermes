import { ProductNotFound } from "../backend/domain/catalog/product_not_found_error";
import { PurposeNotFound } from "../backend/domain/purposes/purpose_not_found_error";
import { InvalidTotal } from "../backend/domain/requests/invalid_total_error";
import { InsufficientStockItem } from "../backend/domain/sequences/insufficient_item_stock_error";
import { makeServices } from "../backend/main";
import { RequestData } from "~/lib/models/request";

const { requestService } = makeServices();

export default defineEventHandler(async (event) => {
    const { request } = await readBody<{ request: RequestData }>(event);

    const voidOrError = await requestService.requestItems(request);

    if (voidOrError.value instanceof PurposeNotFound) {
        return { status: 404, message: voidOrError.value.message };
    }

    if (voidOrError.value instanceof ProductNotFound) {
        return { status: 404, message: voidOrError.value.message };
    }

    if (voidOrError.value instanceof InvalidTotal) {
        return { status: 400, message: voidOrError.value.message };
    }

    if (voidOrError.value instanceof InsufficientStockItem) {
        return { status: 400, message: voidOrError.value.message };
    }

    return { status: 200, message: "Solicitação efetuada com sucesso" };
});
