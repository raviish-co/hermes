import type { PrismaClient } from "@prisma/client";
import { Category } from "../../domain/catalog/categories/category";
import { CategoryNotFound } from "../../domain/catalog/categories/category_not_found_error";
import type { CategoryRepository } from "../../domain/catalog/categories/category_repository";
import { type Either, left, right } from "../../shared/either";
import { ID } from "../../shared/id";

function categoryFactory(categoryData: any, variationsData: any[]): Category {
    return new Category(
        ID.fromString(categoryData?.category_id!),
        categoryData?.name!,
        variationsData.map((v) => ID.fromString(v.variation_id)),
        categoryData?.description ?? undefined
    );
}

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

        return right(categoryFactory(categoryData, variationsData));
    }

    async getAll(): Promise<Category[]> {
        const categoriesData = await this.#prisma.category.findMany();
        const categories: Category[] = [];
        for (const categoryData of categoriesData) {
            categories.push(categoryFactory(categoryData, []));
        }

        return categories;
    }

    async findByName(name: string): Promise<Either<CategoryNotFound, Category>> {
        const categoryData = await this.#prisma.category.findFirst({
            where: { name: name },
        });

        if (!categoryData) return left(new CategoryNotFound());

        const variationsData = await this.#prisma.variation.findMany({
            where: { variation_id: { in: categoryData?.variations?.split(",") } },
        });

        return right(categoryFactory(categoryData, variationsData));
    }

    async save(category: Category): Promise<void> {
        await this.#prisma.category.create({
            data: {
                category_id: category.categoryId.toString(),
                name: category.name,
                description: category.description,
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
