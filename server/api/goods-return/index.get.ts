import { useGoodsReturnService } from "~/composables/useGoodsReturnService";
import { toGoodsReturnNoteDTO } from "./goods_return_dto";

const goodsReturnService = useGoodsReturnService();

export default defineEventHandler(async (event) => {
    const notes = await goodsReturnService.list();
    return notes.map(toGoodsReturnNoteDTO);
});
