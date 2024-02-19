import { ItemCategory } from "../backend/domain/catalog/item";
import { makeServices } from "../backend/main";
import { ConditionStatus, ItemModel } from "~/lib/models/item";

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
        total: "0,00",
        securityDeposit: "00,0",
    }));
}
