import { useImportService } from "@app/composables/useImportService";
import { FileEmpty } from "@backend/adapters/readers/file_empty_error";
import { InvalidCsvRow } from "@backend/adapters/readers/file_empty_line_error";
import { FileNotSupported } from "@backend/adapters/readers/file_not_supported_error";
import { InvalidFileHeader } from "@backend/adapters/readers/invalid_file_header_error";
import { VariationNotFound } from "@backend/domain/catalog/variations/variation_not_found_error";
import { HttpStatus } from "~~/server/api/http_status";
import { checkAnonymousUser } from "../check_anonymous_user";

const service = useImportService();

export default defineEventHandler(async (event) => {
    checkAnonymousUser(event);

    const formData = await readFormData(event);

    const file = formData.get("file") as File;

    const voidOrErr = await service.uploadItems(file);

    if (voidOrErr.value instanceof InvalidFileHeader) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "Cabeçalho do arquivo inválido",
        });
    }

    if (voidOrErr.value instanceof FileEmpty) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "Arquivo vazio",
        });
    }

    if (voidOrErr.value instanceof FileNotSupported) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "Tipo de arquivo não suportado",
        });
    }

    if (voidOrErr.value instanceof InvalidCsvRow) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "Arquivo contém linhas vazias",
        });
    }

    if (voidOrErr.value instanceof VariationNotFound) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            message: "Variação não encontrada",
        });
    }

    if (voidOrErr.value instanceof Error) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            message: "Erro ao importar artigos",
        });
    }

    setResponseStatus(event, HttpStatus.Created);

    return { message: "Artigos importados com sucesso!" };
});
