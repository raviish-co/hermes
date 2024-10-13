import { useGoodsIssueService } from "~/composables/useGoodsIssueService";
import { checkAnonymousUser } from "../check_anonymous_user";
import { toGoodsIssueNoteDTO } from "./goods_issue_note_dto";

const service = useGoodsIssueService();

export default defineEventHandler(async (event) => {
    checkAnonymousUser(event);

    const result = await service.list();
    return result.map(toGoodsIssueNoteDTO);
});
