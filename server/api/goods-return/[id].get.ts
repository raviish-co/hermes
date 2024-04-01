import { GoodsReturnNoteNotFound } from "~/lib/backend/domain/goods_return/goods_return_note_not_found_error";
import { toGoodsReturnNoteDTO } from "./goods_return_dto";
import { makeServices } from "~/lib/backend/main";
import { HttpStatus } from "../http_status";

const { goodsReturnService } = makeServices();

export default defineEventHandler(async (event) => {
    const noteId = getRouterParam(event, "id", { decode: true });

    if (!noteId) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: "ID da Guia de Devolução não informado.",
        });
    }

    const noteOrErr = await goodsReturnService.get(noteId);

    if (noteOrErr.value instanceof GoodsReturnNoteNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            statusMessage: "Guia de Devolução não encontrada",
        });
    }

    if (noteOrErr.isLeft()) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            statusMessage: "Erro ao buscar a Guia de Devolução",
        });
    }

    return toGoodsReturnNoteDTO(noteOrErr.value);
});
