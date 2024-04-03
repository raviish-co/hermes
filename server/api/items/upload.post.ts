import { InvalidFileHeader } from "~/lib/backend/adapters/readers/invalid_file_header_error";
import { FileNotSupported } from "~/lib/backend/adapters/readers/file_not_supported_error";
import { FileEmpty } from "~/lib/backend/adapters/readers/file_empty_error";
import { HttpStatus } from "~/server/api/http_status";
import { makeServices } from "~/lib/backend/main";

const { importService } = makeServices();

export default defineEventHandler(async (event) => {
    const formData = await readFormData(event);

    const file = formData.get("file") as File;

    const voidOrErr = await importService.uploadItems(file);

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

    return { message: "Artigos importados com sucesso!" };
});
