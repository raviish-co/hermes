import type { PrismaClient } from "@prisma/client";
import { Item } from "../../domain/catalog/items/item";
import { ItemNotFound } from "../../domain/catalog/items/item_not_found_error";
import type { ItemRepository } from "../../domain/catalog/items/item_repository";
import { Decimal } from "../../shared/decimal";
import { left, right, type Either } from "../../shared/either";
import { ID } from "../../shared/id";
import type { Pagination, PaginatorOptions } from "../../shared/pagination";

function itemFactory(itemData: any): Item {
    return new Item(
        ID.fromString(itemData.productId),
        itemData.name,
        new Decimal(itemData.price),
        itemData.categoryId ? ID.fromString(itemData.categoryId) : undefined,
        itemData.sectionId ? ID.fromString(itemData.sectionId) : undefined,
        extractVariationValues(itemData),
        itemData.tags ? itemData.tags.split(",") : undefined
    );
}

function extractVariationValues(itemData: any) {
    let variationsValues: Record<string, string> = {};

    if (itemData.variations) {
        for (const v of itemData.variations) {
            variationsValues[v.variationId] = v.value;
        }
    }
    return variationsValues;
}

export class PostgresItemRepository implements ItemRepository {
    #prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.#prisma = prisma;
    }

    async getAll(opts?: PaginatorOptions): Promise<Pagination<Item>> {
        const itemsData = await this.#prisma.product.findMany({ include: { variations: true } });
        return {
            result: itemsData.map(itemFactory),
            pageToken: 0,
            perPage: 0,
            total: 0,
        };
    }

    async findAll(itemsIds: ID[]): Promise<Either<ItemNotFound, Item[]>> {
        const itemData = await this.#prisma.product.findMany({
            include: { variations: true },
            where: { productId: { in: itemsIds.map((i) => i.toString()) } },
        });

        const items = itemData.map(itemFactory);

        if (items.length !== itemsIds.length) return left(new ItemNotFound());

        return right(items);
    }

    async getById(itemId: ID): Promise<Either<ItemNotFound, Item>> {
        const itemData = await this.#prisma.product.findUnique({
            where: { productId: itemId.toString() },
            include: { variations: true },
        });

        if (!itemData) return left(new ItemNotFound());

        return right(itemFactory(itemData));
    }

    async search(query: string, opts: PaginatorOptions): Promise<Pagination<Item>> {
        const skip = (opts.pageToken - 1) * opts.perPage;
        const itemsData = await this.#prisma.product.findMany({
            include: { variations: true },
            where: {
                OR: [
                    { productId: { contains: query } },
                    { name: { contains: query } },
                    { fulltext: { contains: query } },
                ],
            },
            skip,
            take: opts.perPage,
        });

        const items = itemsData.map(itemFactory);

        return {
            result: items,
            pageToken: opts.pageToken,
            perPage: opts.perPage,
            total: items.length,
        };
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
                tags: item.tags?.join(","),
                fulltext: item.fulltext,
            },
        });

        if (!item.variations) return;

        await this.#prisma.productVariations.createMany({
            data: Object.entries(item.variations).map(([variationId, value]) => ({
                productId: item.itemId.toString(),
                variationId,
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
