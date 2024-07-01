import { useCatalogService } from "~/composables/useCatalogService";
import { CategoryAlreadyExists } from "~/lib/backend/domain/catalog/categories/category_already_exists_error";
import { VariationNotFound } from "~/lib/backend/domain/catalog/variations/variation_not_found_error";
import { HttpStatus } from "../http_status";

const catalogService = useCatalogService();

export default defineEventHandler(async (event) => {
    const data = await readBody(event);

    const voidOrErr = await catalogService.registerCategory(
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

    setResponseStatus(event, HttpStatus.Created);
    return { message: "Categoria registada com sucesso" };
});
