import { Category } from "~~/server/backend/domain/catalog/categories/category";
import { _categoriesData } from "~~/server/backend/tests/stubs/category_repository_stub";
import { prismaClient } from "../prisma/prisma_client";
import { PostgresCategoryRepository } from "../postgres_category_repository";

(async function () {
    const categoryPGRepository = new PostgresCategoryRepository(prismaClient);

    await Promise.all([
        _categoriesData.map(async (category) => {
            const categoryToSave = new Category(category.id, category.name, category.variationsIds);

            await categoryPGRepository.save(categoryToSave);
            console.log("Category with id: " + category.id + " saved to pg reposiory successfully");
        }),
    ]);
})();
