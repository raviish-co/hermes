import { makeServices } from "~/lib/backend/main";
import { HttpStatus } from "./http_status";
import { InvalidEntryDate } from "~/lib/backend/domain/goods_receipt/invalid_entry_date_error";
import { InvalidLines } from "~/lib/backend/domain/goods_receipt/invalid_lines_error";
import { ItemNotFound } from "~/lib/backend/domain/catalog/item_not_found_error";

const { goodsReceiptService } = makeServices();

export default defineEventHandler(async (event) => {
    const { data } = await readBody(event);

    const voidOrError = await goodsReceiptService.new(data);

    if (voidOrError.value instanceof InvalidEntryDate) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "A data de entrada de mercadoria é inválida",
        });
    }

    if (voidOrError.value instanceof InvalidLines) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "Linhas inválidas",
        });
    }

    if (voidOrError.value instanceof ItemNotFound) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "Artigo não encontrado",
        });
    }

    setResponseStatus(event, HttpStatus.Created);

    return { message: "Entrada de mercadoria efetuada com sucesso" };
});
