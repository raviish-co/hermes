import { InvalidEntryDate } from "~/lib/backend/domain/goods_receipt/invalid_entry_date_error";
import { InvalidLines } from "~/lib/backend/domain/goods_receipt/invalid_lines_error";
import { ItemNotFound } from "~/lib/backend/domain/catalog/items/item_not_found_error";
import { makeServices } from "~/lib/backend/main";
import { HttpStatus } from "../http_status";

const { goodsReceiptService } = makeServices();

export default defineEventHandler(async (event) => {
    const { data } = await readBody(event);

    const voidOrErr = await goodsReceiptService.new(data);

    if (voidOrErr.value instanceof InvalidEntryDate) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: "A data de entrada de mercadoria invalida",
        });
    }

    if (voidOrErr.value instanceof InvalidLines) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: "Linhas invalidas",
        });
    }

    if (voidOrErr.value instanceof ItemNotFound) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: "Artigo nao encontrado",
        });
    }

    if (voidOrErr.isLeft()) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            statusMessage: "Erro ao efeturar saida de mercadoria",
        });
    }

    setResponseStatus(event, HttpStatus.Created);
    return { message: "Entrada de mercadoria efetuada com sucesso" };
});
