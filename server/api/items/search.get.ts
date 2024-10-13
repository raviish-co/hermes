import { useCatalogService } from "~/composables/useCatalogService";
import { checkAnonymousUser } from "../check_anonymous_user";
import { toItemDTO } from "./item_dto";

const service = useCatalogService();

export default defineEventHandler(async (event) => {
    checkAnonymousUser(event);

    const { query, pageToken, perPage } = getQuery<{
        query: string;
        pageToken?: string;
        perPage?: string;
    }>(event);

    const { result, total } = await service.searchItems(
        query,
        Number(pageToken),
        Number(perPage),
    );

    const items = result.map(toItemDTO);

    return { items, total };
});
