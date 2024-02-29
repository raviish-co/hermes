import { toGoodsIssueNoteDTO } from "./goods_issue_note_dto";
import { makeServices } from "~/lib/backend/main";

const { goodsIssueService } = makeServices();

export default defineEventHandler(async (event) => {
    const result = await goodsIssueService.list();

    return result.map(toGoodsIssueNoteDTO);
});
