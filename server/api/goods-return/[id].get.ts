import { useGoodsReturnService } from "~/composables/useGoodsReturnService";
import { GoodsReturnNoteNotFound } from "~/lib/backend/domain/goods_return/goods_return_note_not_found_error";
import { HttpStatus } from "../http_status";
import { toGoodsReturnNoteDTO } from "./goods_return_dto";

const service = useGoodsReturnService();

export default defineEventHandler(async (event) => {
    const noteId = getRouterParam(event, "id", { decode: true });

    if (!noteId) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: "ID da Guia de devolucao nao informado.",
        });
    }

    const noteOrErr = await service.get(noteId);

    if (noteOrErr.value instanceof GoodsReturnNoteNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            statusMessage: "Guia de devolucao nao encontrada",
        });
    }

    if (noteOrErr.isLeft()) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            statusMessage: "Erro ao buscar a Guia de Devolucao",
        });
    }

    return toGoodsReturnNoteDTO(noteOrErr.value);
});
