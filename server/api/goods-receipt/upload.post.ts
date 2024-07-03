import { useImportService } from "~/composables/useImportService";
import { FileEmpty } from "~/lib/backend/adapters/readers/file_empty_error";
import { FileNotSupported } from "~/lib/backend/adapters/readers/file_not_supported_error";
import { InvalidFileHeader } from "~/lib/backend/adapters/readers/invalid_file_header_error";
import { ItemStockNotFound } from "~/lib/backend/domain/warehouse/item_stock_not_found";
import { HttpStatus } from "../http_status";

const service = useImportService();

export default defineEventHandler(async (event) => {
    const formData = await readFormData(event);

    const file = formData.get("file") as File;

    const voidOrErr = await service.uploadItemsInStock(file);

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

    if (voidOrErr.value instanceof ItemStockNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            statusMessage: "Artigos em armazem nao encontrados.",
        });
    }

    if (voidOrErr.value instanceof Error) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            statusMessage: "Erro carregar os artigos em armazem.",
        });
    }

    setResponseStatus(event, HttpStatus.Created);

    return { message: "Entrada de artigos efectuda com sucesso!" };
});
