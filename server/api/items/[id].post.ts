import { useCatalogService } from "@app/composables/useCatalogService";
import { SectionNotFound } from "@backend/domain/catalog/departments/section_not_found_error";
import { checkAnonymousUser } from "../check_anonymous_user";
import { HttpStatus } from "../http_status";

const service = useCatalogService();

export default defineSafeEventHandler(async (event) => {
    checkAnonymousUser(event);

    const itemId = getRouterParam(event, "id", { decode: true });
    const data = await readBody(event);

    if (!itemId) {
        throw createError({
            message: "ID do item não informado",
            statusCode: HttpStatus.BadRequest,
        });
    }

    const voidOrErr = await service.updateItem(itemId, data);

    if (voidOrErr.value instanceof SectionNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            message: "Secçao não encontrada",
        });
    }

    if (voidOrErr.isLeft()) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            message: "Erro ao registar o artigo",
        });
    }

    setResponseStatus(event, HttpStatus.Created);

    return { message: "Artigo salvo com sucesso." };
});
