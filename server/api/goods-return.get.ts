import { makeServices } from "~/lib/backend/main";
import { toGoodsReturnNoteDTO } from "./goods_return_dto";

const { goodsReturnService } = makeServices();

export default defineEventHandler(async (event) => {
    const result = await goodsReturnService.list();
    return result.map(toGoodsReturnNoteDTO);
});
