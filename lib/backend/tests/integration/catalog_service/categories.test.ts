import { describe, expect, it } from "vitest";
import { CategoryAlreadyExists } from "../../../domain/catalog/categories/category_already_exists_error";
import { VariationNotFound } from "../../../domain/catalog/variations/variation_not_found_error";
import { CategoryRepositoryStub } from "../../stubs/category_repository_stub";
import { VariationRepositoryStub } from "../../stubs/variation_repository_stub";
import { ItemRepositoryStub } from "../../stubs/item_repository_stub";
import { catalogService } from "./service";

describe("CatalogService - Registrar categoria", () => {
    it("Deve registrar uma categoria", async () => {
        const itemRepository = new ItemRepositoryStub();

        const { service, categoryRepository } = catalogService({ itemRepository });

        await service.registerCategory("");

        const categories = await categoryRepository.getAll();

        expect(categories.length).toEqual(1);
    });

    it("Deve registrar uma categoria com o seu nome no repositório", async () => {
        const name = "Sapatos";
        const itemRepository = new ItemRepositoryStub();

        const { service, categoryRepository } = catalogService({ itemRepository });

        await service.registerCategory(name);

        const category = await categoryRepository.last();

        expect(category.name).toEqual(name);
    });

    it("Deve retornar erro **CategoryAlreadyExists** se a categoria já existir", async () => {
        const name = "Sapatos";
        const itemRepository = new ItemRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();

        const { service } = catalogService({ itemRepository, categoryRepository });

        const error = await service.registerCategory(name);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(CategoryAlreadyExists);
    });

    it("Deve registar as variações da categoria", async () => {
        const name = "Sapatos";
        const variationsIds = ["1", "2"];
        const itemRepository = new ItemRepositoryStub();
        const variationRepository = new VariationRepositoryStub();
        const { service, categoryRepository } = catalogService({
            itemRepository,
            variationRepository,
        });

        await service.registerCategory(name, variationsIds);

        const category = await categoryRepository.last();

        expect(category.variationsIds).toBeDefined();
        expect(category.variationsIds.length).toEqual(2);
        expect(category.variationsIds[0].toString()).toEqual("1");
    });

    it("Deve retornar erro **VariationNotFound** se uma das variações não existir no repositório", async () => {
        const name = "Sapatos";
        const variationsIds = ["1", "3"];
        const itemRepository = new ItemRepositoryStub();

        const { service } = catalogService({ itemRepository });

        const error = await service.registerCategory(name, variationsIds);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(VariationNotFound);
    });

    it("Deve gerar o identificador da categoria", async () => {
        const name = "Sapatos";
        const variationsIds = ["1", "2"];
        const itemRepository = new ItemRepositoryStub();
        const variationRepository = new VariationRepositoryStub();
        const { service, categoryRepository } = catalogService({
            itemRepository,
            variationRepository,
        });

        await service.registerCategory(name, variationsIds);

        const category = await categoryRepository.last();

        expect(category.categoryId.toString()).toEqual("RVSC - 1000");
    });

    it("Deve registrar a descrição da categoria", async () => {
        const name = "Sapatos";
        const variationsIds = ["1", "2"];
        const description = "Categoria de sapatos";
        const itemRepository = new ItemRepositoryStub();
        const variationRepository = new VariationRepositoryStub();
        const { service, categoryRepository } = catalogService({
            itemRepository,
            variationRepository,
        });

        await service.registerCategory(name, variationsIds, description);

        const category = await categoryRepository.last();

        expect(category.description).toEqual(description);
    });
});

describe("CatalogService - Recuperar todas as categorias", () => {
    it("Deve recuperar as categorias do repositório", async () => {
        const itemRepository = new ItemRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();
        const { service } = catalogService({ itemRepository, categoryRepository });

        const categorias = await service.listCategories();

        expect(categorias.length).toBeGreaterThanOrEqual(1);
    });
});
