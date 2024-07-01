import { useGoodsIssueService } from "~/composables/useGoodsIssueService";
import { HttpStatus } from "../http_status";
import { toGoodsIssueNoteDTO } from "./goods_issue_note_dto";

const goodsIssueService = useGoodsIssueService();

export default defineEventHandler(async (event) => {
    const { query } = getQuery<{ query: string }>(event);

    const notes = await goodsIssueService.search(query);

    setResponseStatus(event, HttpStatus.OK);

    return notes.map(toGoodsIssueNoteDTO);
});
