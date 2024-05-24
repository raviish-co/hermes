import { makeServices } from "~/lib/backend/main";
import { toGoodsIssueNoteDTO } from "./goods_issue_note_dto";
import { HttpStatus } from "../http_status";

const { goodsIssueService } = makeServices();

export default defineEventHandler(async (event) => {
    const { query } = getQuery<{ query: string }>(event);

    const notes = await goodsIssueService.search(query);

    setResponseStatus(event, HttpStatus.OK);

    return notes.map(toGoodsIssueNoteDTO);
});
