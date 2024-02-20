import { Item } from "@backend/domain/catalog/item_category";
import { ItemModel } from "~/lib/frontend/models/item";
import { makeServices } from "@backend/main";

const { catalogService } = makeServices();

export default defineEventHandler(async (event) => {
    const { query, pageToken, perPage } = getQuery<{
        query: string;
        pageToken?: string;
        perPage?: string;
    }>(event);

    const { result, total } = await catalogService.searchItems(
        query,
        Number(pageToken),
        Number(perPage)
    );

    const items = makeItems(result);

    return { items, total };
});

function makeItems(result: Item[]): ItemModel[] {
    return result.map((r) => ({
        itemId: r.itemId.toString(),
        name: r.name,
        price: r.price.value,
        categoryId: r.categoryId.toString(),
        variationsValues: [],
        isUnique: r.isUnique(),
        quantity: r.getStock().getQuantity(),
        condition: {
            status: r.getCondition().status,
            comment: r.getCondition()?.comment,
        },
    }));
}
