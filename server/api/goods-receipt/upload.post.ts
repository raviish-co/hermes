import { useImportService } from "~/composables/useImportService";
import { useAuth } from "~/composables/useAuth";
import { FileEmpty } from "~/lib/backend/adapters/readers/file_empty_error";
import { FileNotSupported } from "~/lib/backend/adapters/readers/file_not_supported_error";
import { InvalidFileHeader } from "~/lib/backend/adapters/readers/invalid_file_header_error";
import { ItemStockNotFound } from "~/lib/backend/domain/warehouse/item_stock_not_found";
import { checkAnonymousUser } from "../check_anonymous_user";
import { HttpStatus } from "../http_status";
import { InvalidQuantitiesError } from "~/lib/backend/application/invalid_quantities_error";
import { UserNotFound } from "~/lib/backend/domain/auth/user_not_found";

const service = useImportService();

export default defineEventHandler(async (event) => {
    checkAnonymousUser(event);

    const formData = await readFormData(event);

    const file = formData.get("file") as File;
    const username = formData.get("username") as string;

    const voidOrErr = await service.uploadItemsInStock(username, file);

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

    if (voidOrErr.value instanceof UserNotFound) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: "Utilizador não encontrado.",
        });
    }

    if (voidOrErr.value instanceof FileNotSupported) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: "Tipo de arquivo nao suportado.",
        });
    }

    if (voidOrErr.value instanceof InvalidQuantitiesError) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage:
                "O total de quantidades boas e com defeito de um artigo em consignacao nao deve ser superior a 1.",
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
