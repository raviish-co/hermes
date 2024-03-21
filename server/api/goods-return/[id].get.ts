import { makeServices } from "~/lib/backend/main";
import { HttpStatus } from "../http_status";
import { toGoodsReturnNoteDTO } from "../goods_return_dto";

const { goodsReturnService } = makeServices();

export default defineEventHandler(async (event) => {
    const noteId = getRouterParam(event, "id", { decode: true });

    if (!noteId) {
        return createError({
            status: HttpStatus.BadRequest,
            message: "ID da Guia de Devolução é obrigatória",
        });
    }

    const noteOrErr = await goodsReturnService.get(noteId);

    if (noteOrErr.isLeft()) {
        return createError({
            status: HttpStatus.NotFound,
            message: "Guia de Devolução não encontrada",
        });
    }

    return toGoodsReturnNoteDTO(noteOrErr.value);
});
