import type { PrismaClient } from "@prisma/client";
import { Category } from "../../domain/catalog/categories/category";
import { CategoryNotFound } from "../../domain/catalog/categories/category_not_found_error";
import type { CategoryRepository } from "../../domain/catalog/categories/category_repository";
import { type Either, left, right } from "../../shared/either";
import { ID } from "../../shared/id";

export class PostgresCategoryRepository implements CategoryRepository {
    #prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.#prisma = prisma;
    }

    async getById(categoryId: ID): Promise<Either<CategoryNotFound, Category>> {
        const categoryData = await this.#prisma.category.findUnique({
            where: { category_id: categoryId.toString() },
        });

        if (!categoryData) return left(new CategoryNotFound());

        const variationsData = await this.#prisma.variation.findMany({
            where: { variation_id: { in: categoryData?.variations?.split(",") } },
        });

        return right(
            new Category(
                ID.fromString(categoryData?.category_id!),
                categoryData?.name!,
                variationsData.map((v) => ID.fromString(v.variation_id))
            )
        );
    }

    async getAll(): Promise<Category[]> {
        const rows = await this.#prisma.category.findMany();
        const categories: Category[] = [];
        for (const row of rows) {
            const category = new Category(
                ID.fromString(row.category_id),
                row.name,
                row.variations?.split(",").map((v) => ID.fromString(v))
            );
            categories.push(category);
        }

        return categories;
    }

    findByName(name: string): Promise<Either<CategoryNotFound, Category>> {
        throw new Error("Method not implemented.");
    }

    async save(category: Category): Promise<void> {
        await this.#prisma.category.create({
            data: {
                category_id: category.categoryId.toString(),
                name: category.name,
                variations: category.variationsIds.map((v) => v.toString()).join(","),
            },
        });
    }

    exists(name: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    last(): Promise<Category> {
        throw new Error("Method not implemented.");
    }
}
