import { useGoodsReturnService } from "~/composables/useGoodsReturnService";
import { toGoodsReturnNoteDTO } from "./goods_return_dto";

const service = useGoodsReturnService();

export default defineEventHandler(async (event) => {
    const notes = await service.list();
    return notes.map(toGoodsReturnNoteDTO);
});
