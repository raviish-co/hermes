import type { PrismaClient } from "@prisma/client";
import { Category } from "../../domain/catalog/categories/category";
import { CategoryNotFound } from "../../domain/catalog/categories/category_not_found_error";
import type { CategoryRepository } from "../../domain/catalog/categories/category_repository";
import { type Either, left, right } from "../../shared/either";
import { ID } from "../../shared/id";

function categoryFactory(categoryData: any): Category {
    const category = new Category(ID.fromString(categoryData.categoryId), categoryData.name);

    if (!categoryData.variations) {
        category.description = categoryData.description;
        return category;
    }

    category.variationsIds = categoryData.variations
        .split(",")
        .map((v: string) => ID.fromString(v));
    category.description = categoryData.description;

    return category;
}

export class PostgresCategoryRepository implements CategoryRepository {
    #prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.#prisma = prisma;
    }

    async getById(categoryId: ID): Promise<Either<CategoryNotFound, Category>> {
        const categoryData = await this.#prisma.category.findUnique({
            where: { categoryId: categoryId.toString() },
        });

        if (!categoryData) return left(new CategoryNotFound());

        return right(categoryFactory(categoryData));
    }

    async getAll(): Promise<Category[]> {
        const categoriesData = await this.#prisma.category.findMany();
        return categoriesData.map(categoryFactory);
    }

    async findByName(name: string): Promise<Either<CategoryNotFound, Category>> {
        const categoryData = await this.#prisma.category.findFirst({
            where: { name: name },
        });

        if (!categoryData) return left(new CategoryNotFound());

        return right(categoryFactory(categoryData));
    }

    async save(category: Category): Promise<void> {
        await this.#prisma.category.create({
            data: {
                categoryId: category.categoryId.toString(),
                name: category.name,
                description: category.description,
                variations: category.variationsIds.map((v) => v.toString()).join(","),
            },
        });
    }

    async exists(name: string): Promise<boolean> {
        const categoryData = await this.#prisma.category.findFirst({ where: { name: name } });

        if (!categoryData) return false;

        return true;
    }

    last(): Promise<Category> {
        throw new Error("Method not implemented.");
    }
}
