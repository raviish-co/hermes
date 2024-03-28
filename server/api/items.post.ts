import { makeServices } from "~/lib/backend/main";
import { HttpStatus } from "./http_status";

const { catalogService } = makeServices();

export default defineEventHandler(async (event) => {
    const data = await readBody(event);

    const voidOrErr = await catalogService.registerItem(data);

    if (voidOrErr.isLeft()) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: "Erro ao registrar o artigo.",
        });
    }

    setResponseStatus(event, HttpStatus.Created);
    return { message: "Artigo registrado com sucesso." };
});
