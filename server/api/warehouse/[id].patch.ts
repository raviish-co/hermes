import { useWarehouseService } from "~/composables/useWarehouseService";
import { HttpStatus } from "../http_status";
import { ItemStockNotFound } from "~/lib/backend/domain/warehouse/item_stock_not_found";

const service = useWarehouseService();

export default defineEventHandler(async (event) => {
    const itemId = getRouterParam(event, "id");

    if (!itemId) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: "ID do item nao informado",
        });
    }

    const voidOrErr = await service.enableItemInStockToInternalUse(itemId);

    if (voidOrErr.value instanceof ItemStockNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            statusMessage: "Item não encontrado no stock",
        });
    }

    if (voidOrErr.isLeft()) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            statusMessage: "Não foi possível actualizar o estado do item no stock",
        });
    }

    return { message: "Item habilitado para uso interno com sucesso" };
});
