import { useCatalogService } from "~/composables/useCatalogService";
import { HttpStatus } from "../http_status";
import { toItemDTO } from "./item_dto";

const catalogService = useCatalogService();

export default defineEventHandler(async (event) => {
    const itemId = getRouterParam(event, "id", { decode: true });

    if (!itemId) {
        throw createError({
            statusMessage: "ID do item nao informado.",
            statusCode: HttpStatus.BadRequest,
        });
    }

    const itemOrErr = await catalogService.getItem(itemId);

    if (itemOrErr.isLeft()) {
        throw createError({
            statusMessage: "Item nao encontrado.",
            statusCode: HttpStatus.NotFound,
        });
    }

    return toItemDTO(itemOrErr.value);
});
