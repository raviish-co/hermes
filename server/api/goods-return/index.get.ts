import { useGoodsReturnService } from "@app/composables/useGoodsReturnService";
import { checkAnonymousUser } from "../check_anonymous_user";
import { toGoodsReturnNoteDTO } from "./goods_return_dto";

const service = useGoodsReturnService();

export default defineEventHandler(async (event) => {
    checkAnonymousUser(event);

    const notes = await service.list();
    return notes.map(toGoodsReturnNoteDTO);
});
