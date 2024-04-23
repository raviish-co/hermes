import { SectionNotFound } from "~/lib/backend/domain/catalog/departments/section_not_found_error";
import { makeServices } from "~/lib/backend/main";
import { HttpStatus } from "../http_status";

const { catalogService } = makeServices();

export default defineEventHandler(async (event) => {
    const itemId = getRouterParam(event, "id", { decode: true });
    const data = await readBody(event);

    if (!itemId) {
        throw createError({
            statusMessage: "ID do item nao informado.",
            statusCode: HttpStatus.BadRequest,
        });
    }

    const voidOrErr = await catalogService.updateItem(itemId, data);

    if (voidOrErr.value instanceof SectionNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            statusMessage: "Seccao nao encontrada.",
        });
    }

    if (voidOrErr.isLeft()) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            statusMessage: "Erro ao registrar o artigo.",
        });
    }

    setResponseStatus(event, HttpStatus.Created);
    return { message: "Artigo salvo com sucesso." };
});
