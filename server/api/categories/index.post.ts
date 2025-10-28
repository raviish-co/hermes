import { useCatalogService } from "@app/composables/useCatalogService";
import { CategoryAlreadyExists } from "@backend/domain/catalog/categories/category_already_exists_error";
import { VariationNotFound } from "@backend/domain/catalog/variations/variation_not_found_error";
import { checkAnonymousUser } from "../check_anonymous_user";
import { HttpStatus } from "../http_status";

const service = useCatalogService();

export default defineEventHandler(async (event) => {
    checkAnonymousUser(event);

    const data = await readBody(event);

    const voidOrErr = await service.registerCategory(
        data.name,
        data.variationsIds,
        data.description
    );

    if (voidOrErr.value instanceof CategoryAlreadyExists) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: "Categoria com o mesmo nome foi registada anteriormente",
        });
    }

    if (voidOrErr.value instanceof VariationNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            statusMessage: "Variacao nao encontrada",
        });
    }

    if (voidOrErr instanceof Error) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            statusMessage: "Erro ao registar categoria",
        });
    }

    setResponseStatus(event, HttpStatus.Created);
    return { message: "Categoria registada com sucesso" };
});
