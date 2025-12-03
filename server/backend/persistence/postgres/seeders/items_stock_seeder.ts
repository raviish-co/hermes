import { ItemStock } from "~~/server/backend/domain/warehouse/item_stock";
import { _itemStockData } from "~~/server/backend/tests/stubs/item_stock_repository_stub";
import { prismaClient } from "../prisma/prisma_client";
import { PostgresItemStockRepository } from "../postgres_item_stock_repository";

(async function () {
    const itemsPostgresRepository = new PostgresItemStockRepository(prismaClient);

    const mappedValues = _itemStockData.map(
        (item) =>
            new ItemStock(
                item.itemId,
                item.goodQuantities,
                item.badQuantities,
                item.itemStockType,
                item.consignmentValue
            )
    );

    await itemsPostgresRepository.saveAll(mappedValues);
    console.log("Items seeded succesfully");
})();
