import { useGoodsReturnService } from "@app/composables/useGoodsReturnService";
import { GoodsReturnNoteNotFound } from "@backend/domain/goods_return/goods_return_note_not_found_error";
import { checkAnonymousUser } from "../check_anonymous_user";
import { HttpStatus } from "../http_status";
import { toGoodsReturnNoteDTO } from "./goods_return_dto";
import { defineSafeEventHandler } from "~~/server/utils/handler";

const service = useGoodsReturnService();

export default defineSafeEventHandler(async (event) => {
    checkAnonymousUser(event);

    const noteId = getRouterParam(event, "id", { decode: true });

    if (!noteId) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: "ID da Guia de devolução não informado",
        });
    }

    const noteOrErr = await service.get(noteId);

    if (noteOrErr.value instanceof GoodsReturnNoteNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            message: "Guia de devolução não encontrada",
        });
    }

    if (noteOrErr.isLeft()) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            message: "Erro ao buscar a Guia de Devolução",
        });
    }

    return toGoodsReturnNoteDTO(noteOrErr.value);
});
