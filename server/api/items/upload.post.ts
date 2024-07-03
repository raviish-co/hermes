import { useImportService } from "~/composables/useImportService";
import { FileEmpty } from "~/lib/backend/adapters/readers/file_empty_error";
import { InvalidCsvRow } from "~/lib/backend/adapters/readers/file_empty_line_error";
import { FileNotSupported } from "~/lib/backend/adapters/readers/file_not_supported_error";
import { InvalidFileHeader } from "~/lib/backend/adapters/readers/invalid_file_header_error";
import { VariationNotFound } from "~/lib/backend/domain/catalog/variations/variation_not_found_error";
import { HttpStatus } from "~/server/api/http_status";

const service = useImportService();

export default defineEventHandler(async (event) => {
    const formData = await readFormData(event);

    const file = formData.get("file") as File;

    const voidOrErr = await service.uploadItems(file);

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

    if (voidOrErr.value instanceof InvalidCsvRow) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: "Arquivo contem linhas vazias.",
        });
    }

    if (voidOrErr.value instanceof VariationNotFound) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            statusMessage: "Variacao nao encontrada.",
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
