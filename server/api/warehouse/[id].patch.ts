import { useWarehouseService } from "@app/composables/useWarehouseService";
import { HttpStatus } from "../http_status";
import { ItemStockNotFound } from "@backend/domain/warehouse/item_stock_not_found";

const service = useWarehouseService();

export default defineSafeEventHandler(async (event) => {
    const itemId = getRouterParam(event, "id");

    if (!itemId) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "ID do item não informado",
        });
    }

    const voidOrErr = await service.markItemInStockAsIntern(itemId);

    if (voidOrErr.value instanceof ItemStockNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            message: "Item não encontrado no stock",
        });
    }

    if (voidOrErr.isLeft()) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            message: "Não foi possível actualizar o estado do item no stock",
        });
    }

    return { message: "Artigo marcado como interno com sucesso" };
});
