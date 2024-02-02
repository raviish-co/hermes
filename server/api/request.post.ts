import { makeRequestService } from "../backend/main";
import { RequestItems } from "~/lib/models/request";

export default defineEventHandler(async (event) => {
    const { request }: { request: RequestItems } = await readBody(event);

    const requestService = makeRequestService();

    return await requestService.requestItems(request);
});
