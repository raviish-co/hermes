import { VariationNotFound } from "~/lib/backend/domain/catalog/variations/variation_not_found_error";
import { SectionNotFound } from "~/lib/backend/domain/catalog/departments/section_not_found_error";
import { makeServices } from "~/lib/backend/main";
import { HttpStatus } from "../http_status";

const { catalogService } = makeServices();

export default defineEventHandler(async (event) => {
    const data = await readBody(event);

    const voidOrErr = await catalogService.registerItem(data);

    if (voidOrErr.value instanceof SectionNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            statusMessage: "Seção não encontrada.",
        });
    }

    if (voidOrErr.value instanceof VariationNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            statusMessage: "Variação não encontrada.",
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
