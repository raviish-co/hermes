import { useGoodsIssueService } from "@app/composables/useGoodsIssueService";
import { checkAnonymousUser } from "../check_anonymous_user";
import { toGoodsIssueNoteDTO } from "./goods_issue_note_dto";

const service = useGoodsIssueService();

export default defineEventHandler(async (event) => {
    checkAnonymousUser(event);

    const query = getQuery(event);

    const pageToken = Number(query.pageToken);
    const perPage = Number(query.perPage);

    const result = await service.list(pageToken, perPage);

    const notes = result.result.map(toGoodsIssueNoteDTO);
    const total = result.total;

    return { notes, total };
});
