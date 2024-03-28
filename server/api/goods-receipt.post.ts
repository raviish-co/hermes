import { makeServices } from "~/lib/backend/main";
import { HttpStatus } from "./http_status";
import { InvalidEntryDate } from "~/lib/backend/domain/goods_receipt/invalid_entry_date_error";
import { InvalidLines } from "~/lib/backend/domain/goods_receipt/invalid_lines_error";
import { ItemNotFound } from "~/lib/backend/domain/catalog/item_not_found_error";
import { MissingDependency } from "~/lib/backend/domain/goods_receipt/missing_dependency_error";

const { goodsReceiptService } = makeServices();

export default defineEventHandler(async (event) => {
    const { data } = await readBody(event);

    const voidOrErr = await goodsReceiptService.new(data);

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

    if (voidOrErr.value instanceof ItemNotFound) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "Artigo não encontrado",
        });
    }

    if (voidOrErr.value instanceof MissingDependency) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "Erro ao efeturar saída de mercadoria",
        });
    }

    setResponseStatus(event, HttpStatus.Created);

    return { message: "Entrada de mercadoria efetuada com sucesso" };
});
