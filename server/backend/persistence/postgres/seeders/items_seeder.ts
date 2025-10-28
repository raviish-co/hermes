import { Item } from "~~/server/backend/domain/catalog/items/item";
import { Decimal } from "~~/server/backend/shared/decimal";
import { ID } from "~~/server/backend/shared/id";
import { _itemData } from "~~/server/backend/tests/stubs/item_repository_stub";
import { prismaClient } from "../prisma/prisma_client";
import { PostgresItemRepository } from "../postgres_item_repository";

(async function () {
    const itemsPostgresRepository = new PostgresItemRepository(prismaClient);

    const mappedValues = _itemData.map(
        (item) =>
            new Item(
                ID.fromString(item.itemId),
                item.name,
                new Decimal(item.price),
                ID.fromString(item.categoryId),
                ID.fromString(item.sectionId),
                item.variationsValues as Record<string, string>,
                item.tags
            )
    );

    await itemsPostgresRepository.saveAll(mappedValues);
    console.log("Items seeded succesfully");
})();
