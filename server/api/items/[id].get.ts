import { useCatalogService } from "@app/composables/useCatalogService";
import { checkAnonymousUser } from "../check_anonymous_user";
import { HttpStatus } from "../http_status";
import { toItemDTO } from "./item_dto";

const service = useCatalogService();

export default defineSafeEventHandler(async (event) => {
    checkAnonymousUser(event);

    const itemId = getRouterParam(event, "id", { decode: true });

    if (!itemId) {
        throw createError({
            message: "ID do item não informado",
            statusCode: HttpStatus.BadRequest,
        });
    }

    const itemOrErr = await service.getItem(itemId);

    if (itemOrErr.isLeft()) {
        throw createError({
            message: "Item não encontrado",
            statusCode: HttpStatus.NotFound,
        });
    }

    return toItemDTO(itemOrErr.value);
});
