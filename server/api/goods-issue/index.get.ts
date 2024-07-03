import { useGoodsIssueService } from "~/composables/useGoodsIssueService";
import { toGoodsIssueNoteDTO } from "./goods_issue_note_dto";

const service = useGoodsIssueService();

export default defineEventHandler(async (event) => {
    const result = await service.list();
    return result.map(toGoodsIssueNoteDTO);
});
