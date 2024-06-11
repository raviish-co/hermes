import { PrismaClient } from "@prisma/client";
import { describe, expect, it } from "vitest";
import { Category } from "../../domain/catalog/categories/category";
import { CategoryNotFound } from "../../domain/catalog/categories/category_not_found_error";
import { ID } from "../../shared/id";
import { Variation } from "../../domain/catalog/variations/variation";
import { PostgresCategoryRepository } from "../../persistense/postgres/postgres_category_repository";
import { PostgresVariationRepository } from "../../persistense/postgres/postgres_variation_repository";

describe("Postgres Category - getById", () => {
    it("Deve recuperar a categoria pelo id", async () => {
        const categoryId = ID.random();
        const categoryRepository = new PostgresCategoryRepository(prisma);
        await categoryRepository.save(new Category(categoryId, "Roupas"));

        const categoryOrErr = await categoryRepository.getById(categoryId);

        const category = <Category>categoryOrErr.value;
        expect(category.categoryId.equals(categoryId)).toBeTruthy();
        expect(category.name).toBe("Roupas");
    });

    it("Deve recuperar a categoria e as suas variações", async () => {
        const categoryId = ID.random();
        const variationId = ID.random();
        const variation = new Variation(variationId, "", []);
        const categoryRepository = new PostgresCategoryRepository(prisma);
        const variationRepository = new PostgresVariationRepository(prisma);
        await variationRepository.save(variation);
        await categoryRepository.save(new Category(categoryId, "Roupas", [variation.variationId]));

        const categoryOrErr = await categoryRepository.getById(categoryId);

        const category = <Category>categoryOrErr.value;

        expect(category.categoryId.equals(categoryId)).toBeTruthy();
        expect(category.variationsIds).toEqual([variation.variationId]);
    });

    it("Deve retornar CategoryNotFound quando a categoria não existe", async () => {
        const categoryId = ID.random();
        const categoryRepository = new PostgresCategoryRepository(prisma);

        const categoryOrErr = await categoryRepository.getById(categoryId);

        expect(categoryOrErr.isLeft()).toBeTruthy();
        expect(categoryOrErr.value).toBeInstanceOf(CategoryNotFound);
    });
});

describe("Postgres Category - getAll", () => {
    it("Deve recuperar todas as categorias do repsitório", async () => {
        const categoryRepository = new PostgresCategoryRepository(prisma);

        const categories = await categoryRepository.getAll();

        expect(categories.length).toBeGreaterThanOrEqual(0);
        expect(categories[0].name).toBe("Roupas");
    });
});

const prisma = new PrismaClient();
