import { makeServices } from "../backend/main";
import { RequestItem } from "~/lib/models/request";

export default defineEventHandler(async (event) => {
    const { request }: { request: RequestItem } = await readBody(event);

    const requestService = makeServices();

    return await requestService.requestItems(request);
});
