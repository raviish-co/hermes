import { useCatalogService } from "@app/composables/useCatalogService";
import { SectionNotFound } from "@backend/domain/catalog/departments/section_not_found_error";
import { checkAnonymousUser } from "../check_anonymous_user";
import { HttpStatus } from "../http_status";

const service = useCatalogService();

export default defineEventHandler(async (event) => {
    checkAnonymousUser(event);

    const itemId = getRouterParam(event, "id", { decode: true });
    const data = await readBody(event);

    if (!itemId) {
        throw createError({
            statusMessage: "ID do item nao informado.",
            statusCode: HttpStatus.BadRequest,
        });
    }

    const voidOrErr = await service.updateItem(itemId, data);

    if (voidOrErr.value instanceof SectionNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            statusMessage: "Seccao nao encontrada.",
        });
    }

    if (voidOrErr.isLeft()) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            statusMessage: "Erro ao registar o artigo.",
        });
    }

    setResponseStatus(event, HttpStatus.Created);
    return { message: "Artigo salvo com sucesso." };
});
