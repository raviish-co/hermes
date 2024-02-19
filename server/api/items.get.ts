import { ItemModel } from "~/lib/frontend/models/item";
import { ItemCategory } from "../../domain/catalog/item_category";

import { makeServices } from "../../main";
export interface Pagination {
    pageToken?: number;
    perPage?: number;
}

export type ConditionStatus = "Bom" | "Mau";

const { catalogService } = makeServices();

export default defineEventHandler(async (event) => {
    const query = getQuery<Pagination>(event);

    const pageToken = Number(query.pageToken);
    const perPage = Number(query.perPage);

    const { result, total } = await catalogService.listItems(pageToken, perPage);

    const items = makeItems(result);

    return { items, total };
});

function makeItems(result: ItemCategory[]): ItemModel[] {
    return result.map((r) => ({
        itemId: r.itemId.toString(),
        name: r.name,
        price: r.price.value,
        categoryId: r.categoryId.toString(),
        variationsValues: [],
        isUnique: r.isUnique(),
        quantity: r.getStock().getQuantity(),
        condition: {
            status: r.getCondition().status as ConditionStatus,
            comment: r.getCondition()?.comment,
        },
    }));
}
