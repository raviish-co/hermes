import { makeServices } from "~/lib/backend/main";
import { HttpStatus } from "./http_status";

const { catalogService } = makeServices();

export default defineEventHandler(async (event) => {
    const data = await readBody(event);

    console.log(data);

    const voidOrErr = await catalogService.registerItem(data.name, data.price, data.comment);

    if (voidOrErr.isLeft()) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: "Erro ao registrar o artigo.",
        });
    }

    setResponseStatus(event, HttpStatus.Created);
    return { message: "Artigo registrado com sucesso." };
});
