import { PrismaClient } from "~/lib/backend/persistence/postgres/generated/prisma";
import { describe, expect, it, vi } from "vitest";
import { Category } from "../../domain/catalog/categories/category";
import { CategoryNotFound } from "../../domain/catalog/categories/category_not_found_error";
import { PostgresCategoryRepository } from "../../persistence/postgres/postgres_category_repository";
import { ID } from "../../shared/id";

describe("PostgresCategoryRepostory - getById", () => {
    it("Deve pesquisar a categoria pelo id", async () => {
        const categoryId = ID.random();
        const { prisma, categoryRepository } = await createSetup();
        const spy = vi.spyOn(prisma.category, "findUnique");

        await categoryRepository.getById(categoryId);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({
            where: { categoryId: categoryId.toString() },
        });
    });

    it("Deve recuperar a categoria pelo id", async () => {
        const { categoryRepository } = await createSetup();

        const categoryOrErr = await categoryRepository.getById(ID.fromString("1"));

        const category = <Category>categoryOrErr.value;
        expect(category.categoryId.toString()).toBe("1");
        expect(category.name).toBe("Roupas");
    });

    it("Deve recuperar a categoria e as suas variações", async () => {
        const categoryId = ID.fromString("1");
        const { categoryRepository } = await createSetup();
        const categoryOrErr = await categoryRepository.getById(categoryId);

        const category = <Category>categoryOrErr.value;

        const variations = category.variationsIds.map((v) => v.toString());
        expect(category.categoryId.toString()).toEqual("1");
        expect(variations).toEqual(["1"]);
    });

    it("Deve retornar CategoryNotFound quando a categoria não existe", async () => {
        const categoryId = ID.random();
        const prisma = { category: { findUnique: async (_args: object) => null } };
        const categoryRepository = new PostgresCategoryRepository(prisma as PrismaClient);

        const categoryOrErr = await categoryRepository.getById(categoryId);

        expect(categoryOrErr.isLeft()).toBeTruthy();
        expect(categoryOrErr.value).toBeInstanceOf(CategoryNotFound);
    });
});

describe("PostgresCategoryRepostory - getAll", () => {
    it("Deve recuperar todas as categorias do repsitório", async () => {
        const { categoryRepository } = await createSetup();

        const categories = await categoryRepository.getAll();

        expect(categories.length).toBeGreaterThanOrEqual(2);
        expect(categories[0].name).toBe("Roupas");
    });
});

describe("PostgresCategoryRepostory - findByName", () => {
    it("Deve recuperar a categoria pelo nome", async () => {
        const name = "Roupas";
        const { categoryRepository } = await createSetup();
        const categoryOrErr = await categoryRepository.findByName(name);

        const category = <Category>categoryOrErr.value;
        expect(category.name).toEqual(name);
    });

    it("Deve retornar CategoryNotFound quando a categoria não existe", async () => {
        const name = "Calças";
        const prisma = { category: { findFirst: async (_args: object) => null } };
        const { categoryRepository } = await createSetup(prisma as PrismaClient);

        const categoryOrErr = await categoryRepository.findByName(name);

        expect(categoryOrErr.isLeft()).toBeTruthy();
        expect(categoryOrErr.value).toBeInstanceOf(CategoryNotFound);
    });
});

describe("PostgresCategoryRepostory - save", () => {
    it("Deve salvar uma categoria", async () => {
        const categoryId = ID.random();
        const { categoryRepository, prisma } = await createSetup();
        const category = new Category(
            categoryId,
            "Sapatilhas",
            [ID.fromString("1"), ID.fromString("2")],
            "Calçados para caminhada"
        );
        const spy = vi.spyOn(prisma.category, "create");

        await categoryRepository.save(category);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({
            data: {
                categoryId: categoryId.toString(),
                name: "Sapatilhas",
                description: "Calçados para caminhada",
                variations: "1,2",
            },
        });
    });
});

describe("PostgresCategoryRepostory - exists", () => {
    it("Deve retornar true se a categoria existe", async () => {
        const name = "Roupas";
        const { categoryRepository } = await createSetup();

        const exists = await categoryRepository.exists(name);

        expect(exists).toBeTruthy();
    });

    it("Deve retornar false se a categoria não existe", async () => {
        const name = "Calças";
        const prisma = { category: { findFirst: async (_args: object) => null } };
        const { categoryRepository } = await createSetup(prisma as PrismaClient);

        const exists = await categoryRepository.exists(name);

        expect(exists).toBeFalsy();
    });
});

const createSetup = async (prismaClient?: PrismaClient) => {
    const prisma = {
        category: {
            findUnique: async (_args: object) => categories[0],
            findMany: async () => categories,
            findFirst: async (_args: object) => categories[0],
            create: async (_args: object) => ({}),
        },
    };

    const categoryRepository = new PostgresCategoryRepository(
        prismaClient ? (prismaClient as PrismaClient) : (prisma as PrismaClient)
    );

    const categories = [
        { categoryId: "1", name: "Roupas", variations: "1" },
        { categoryId: "2", name: "Calçados", variations: "1,2" },
    ];

    return { prisma, categoryRepository };
};
