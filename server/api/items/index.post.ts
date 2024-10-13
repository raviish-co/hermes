import { useCatalogService } from "~/composables/useCatalogService";
import { SectionNotFound } from "~/lib/backend/domain/catalog/departments/section_not_found_error";
import { VariationNotFound } from "~/lib/backend/domain/catalog/variations/variation_not_found_error";
import { checkAnonymousUser } from "../check_anonymous_user";
import { HttpStatus } from "../http_status";

const service = useCatalogService();

export default defineEventHandler(async (event) => {
    checkAnonymousUser(event);

    const data = await readBody(event);

    const voidOrErr = await service.registerItem(data);

    if (voidOrErr.value instanceof SectionNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            statusMessage: "Seccao nao encontrada.",
        });
    }

    if (voidOrErr.value instanceof VariationNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            statusMessage: "Variacao nao encontrada.",
        });
    }

    if (voidOrErr.isLeft()) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            statusMessage: "Erro ao registrar o artigo.",
        });
    }

    setResponseStatus(event, HttpStatus.Created);
    return { message: "Artigo registrado com sucesso." };
});
