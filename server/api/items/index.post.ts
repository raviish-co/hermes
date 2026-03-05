import { useCatalogService } from "@app/composables/useCatalogService";
import { SectionNotFound } from "@backend/domain/catalog/departments/section_not_found_error";
import { VariationNotFound } from "@backend/domain/catalog/variations/variation_not_found_error";
import { checkAnonymousUser } from "../check_anonymous_user";
import { HttpStatus } from "../http_status";

const service = useCatalogService();

export default defineSafeEventHandler(async (event) => {
    checkAnonymousUser(event);

    const data = await readBody(event);

    const voidOrErr = await service.registerItem(data);

    if (voidOrErr.value instanceof SectionNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            message: "Secçao não encontrada",
        });
    }

    if (voidOrErr.value instanceof VariationNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            message: "Variação não encontrada",
        });
    }

    if (voidOrErr.isLeft()) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            message: "Erro ao registar o artigo",
        });
    }

    setResponseStatus(event, HttpStatus.Created);

    return { message: "Artigo registado com sucesso" };
});
