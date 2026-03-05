import { useImportService } from "@app/composables/useImportService";
import { FileEmpty } from "@backend/adapters/readers/file_empty_error";
import { FileNotSupported } from "@backend/adapters/readers/file_not_supported_error";
import { InvalidFileHeader } from "@backend/adapters/readers/invalid_file_header_error";
import { ItemStockNotFound } from "@backend/domain/warehouse/item_stock_not_found";
import { checkAnonymousUser } from "../check_anonymous_user";
import { HttpStatus } from "../http_status";
import { InvalidQuantitiesError } from "@backend/application/invalid_quantities_error";
import { UserNotFound } from "@backend/domain/auth/user_not_found";
import { defineSafeEventHandler } from "~~/server/utils/handler";

const service = useImportService();

export default defineSafeEventHandler(async (event) => {
    checkAnonymousUser(event);

    const formData = await readFormData(event);

    const file = formData.get("file") as File;
    const username = formData.get("username") as string;

    const voidOrErr = await service.uploadItemsInStock(username, file);

    if (voidOrErr.value instanceof InvalidFileHeader) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "Cabeçalho do arquivo inválido.",
        });
    }

    if (voidOrErr.value instanceof FileEmpty) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "Arquivo vazio.",
        });
    }

    if (voidOrErr.value instanceof UserNotFound) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "Utilizador não encontrado.",
        });
    }

    if (voidOrErr.value instanceof FileNotSupported) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "Tipo de arquivo não suportado.",
        });
    }

    if (voidOrErr.value instanceof InvalidQuantitiesError) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message:
                "O total de quantidades boas e com defeito de um artigo em consignacao não deve ser superior a 1.",
        });
    }

    if (voidOrErr.value instanceof ItemStockNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            message: "Artigos em armazem não encontrados.",
        });
    }

    if (voidOrErr.value instanceof Error) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            message: "Erro ao carregar os artigos em armazem.",
        });
    }

    setResponseStatus(event, HttpStatus.Created);

    return { message: "Entrada de artigos efectuda com sucesso!" };
});
