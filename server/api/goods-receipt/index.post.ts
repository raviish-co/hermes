import { useGoodsReceiptService } from "@app/composables/useGoodsReceiptService";
import { ItemNotFound } from "@backend/domain/catalog/items/item_not_found_error";
import { InvalidEntryDate } from "@backend/domain/goods_receipt/invalid_entry_date_error";
import { InvalidLines } from "@backend/domain/goods_receipt/invalid_lines_error";
import { checkAnonymousUser } from "../check_anonymous_user";
import { HttpStatus } from "../http_status";
import { InvalidQuantitiesError } from "@backend/application/invalid_quantities_error";
import { defineSafeEventHandler } from "~~/server/utils/handler";

const service = useGoodsReceiptService();

export default defineSafeEventHandler(async (event) => {
    checkAnonymousUser(event);

    const { data } = await readBody(event);

    const voidOrErr = await service.new(data);

    if (voidOrErr.value instanceof InvalidEntryDate) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "A data de entrada de mercadoria é inválida",
        });
    }

    if (voidOrErr.value instanceof InvalidLines) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "Linhas inválidas",
        });
    }

    if (voidOrErr.value instanceof InvalidQuantitiesError) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message:
                "O total de quantidades boas e com defeito de um artigo em consignacao não deve ser superior a 1",
        });
    }

    if (voidOrErr.value instanceof ItemNotFound) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "Artigo não encontrado",
        });
    }

    if (voidOrErr instanceof Error) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            message: "Erro ao efeturar saida de mercadoria",
        });
    }

    setResponseStatus(event, HttpStatus.Created);

    return { message: "Entrada de mercadoria efetuada com sucesso" };
});
