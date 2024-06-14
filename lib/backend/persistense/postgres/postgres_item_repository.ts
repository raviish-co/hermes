import type { PrismaClient } from "@prisma/client";
import { Item } from "../../domain/catalog/items/item";
import { ItemNotFound } from "../../domain/catalog/items/item_not_found_error";
import type { ItemRepository } from "../../domain/catalog/items/item_repository";
import type { Either } from "../../shared/either";
import { ID } from "../../shared/id";
import type { Pagination } from "../../shared/pagination";

export class PostgresItemRepository implements ItemRepository {
    #prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.#prisma = prisma;
    }

    getAll(): Promise<Item[]> {
        throw new Error("Method not implemented.");
    }

    findAll(itemsIds: ID[]): Promise<Either<ItemNotFound, Item[]>> {
        throw new Error("Method not implemented.");
    }

    getById(itemId: ID): Promise<Either<ItemNotFound, Item>> {
        throw new Error("Method not implemented.");
    }

    list(pageToken: number, perPage: number): Promise<Pagination<Item>> {
        throw new Error("Method not implemented.");
    }

    search(query: string, pageToken: number, perPage: number): Promise<Pagination<Item>> {
        throw new Error("Method not implemented.");
    }

    updateAll(items: Item[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

    update(item: Item): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async save(item: Item): Promise<void> {
        await this.#prisma.product.create({
            data: {
                productId: item.itemId.toString(),
                name: item.name,
                price: item.price.value,
                categoryId: item.categoryId?.toString(),
                sectionId: item.sectionId?.toString(),
            },
        });

        if (!item.variations) return;

        await this.#prisma.productVariations.createMany({
            data: Object.entries(item.variations).map(([name, value]) => ({
                productId: item.itemId.toString(),
                name,
                value,
            })),
        });
    }

    saveAll(items: Item[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

    last(): Promise<Item> {
        throw new Error("Method not implemented.");
    }
}
