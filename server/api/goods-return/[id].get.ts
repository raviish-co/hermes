import { makeServices } from "~/lib/backend/main";
import { HttpStatus } from "../http_status";
import { toGoodsReturnNoteDTO } from "./goods_return_dto";

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

    if (noteOrErr.isLeft()) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            statusMessage: "Guia de Devolução não encontrada",
        });
    }

    return toGoodsReturnNoteDTO(noteOrErr.value);
});
