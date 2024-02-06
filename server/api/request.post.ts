import { makeRequestService } from "../backend/main";
import { RequestItem } from "~/lib/models/request";

export default defineEventHandler(async (event) => {
    const { request }: { request: RequestItem } = await readBody(event);

    const requestService = makeRequestService();

    return await requestService.requestItems(request);
});
