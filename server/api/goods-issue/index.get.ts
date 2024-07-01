import { useGoodsIssueService } from "~/composables/useGoodsIssueService";
import { toGoodsIssueNoteDTO } from "./goods_issue_note_dto";

const goodsIssueService = useGoodsIssueService();

export default defineEventHandler(async (event) => {
    const result = await goodsIssueService.list();
    return result.map(toGoodsIssueNoteDTO);
});
