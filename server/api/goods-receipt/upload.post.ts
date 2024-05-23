import { FileEmpty } from "~/lib/backend/adapters/readers/file_empty_error";
import { FileNotSupported } from "~/lib/backend/adapters/readers/file_not_supported_error";
import { InvalidFileHeader } from "~/lib/backend/adapters/readers/invalid_file_header_error";
import { makeServices } from "~/lib/backend/main";
import { HttpStatus } from "../http_status";

const { importService } = makeServices();

export default defineEventHandler(async (event) => {
    const formData = await readFormData(event);

    const file = formData.get("file") as File;

    const voidOrErr = await importService.uploadItemsInStock(file);

    if (voidOrErr.value instanceof InvalidFileHeader) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: "Cabecalho do arquivo invalido.",
        });
    }

    if (voidOrErr.value instanceof FileEmpty) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: "Arquivo vazio.",
        });
    }

    if (voidOrErr.value instanceof FileNotSupported) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: "Tipo de arquivo nao suportado.",
        });
    }

    if (voidOrErr.value instanceof Error) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            statusMessage: "Erro ao importar artigos.",
        });
    }

    setResponseStatus(event, HttpStatus.Created);

    return { message: "Entrada de artigos efectuda com sucesso!" };
});
