import { InmemCategoryRepository } from "../../persistense/inmem/inmem_category_repository";
import { InmemItemRepository } from "../../persistense/inmem/inmem_item_repository";
import { ItemRepositoryStub } from "../stubs/item_repository_stub";
import { CatalogService } from "../../application/catalog_service";
import { describe, it, vi, expect } from "vitest";
import { Category } from "../../domain/catalog/category";
import { ID } from "../../shared/id";

describe("Test ListItems", () => {
    it("Deve chamar o método **list** no repositório de artigos", async () => {
        const itemRepository = new ItemRepositoryStub();
        const categoryRepoistory = new InmemCategoryRepository();
        const service = new CatalogService(itemRepository, categoryRepoistory);
        const spy = vi.spyOn(itemRepository, "list");

        await service.listItems();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Deve buscar os artigos no repositório", async () => {
        const itemRepository = new ItemRepositoryStub();
        const categoryRepoistory = new InmemCategoryRepository();
        const service = new CatalogService(itemRepository, categoryRepoistory);

        const { result: items } = await service.listItems();

        expect(items.length).toBeGreaterThanOrEqual(2);
        expect(items[0].itemId.toString()).toEqual("1001");
    });

    it("Deve retornar um array vazio se não existir artigos", async () => {
        const itemRepository = new InmemItemRepository();
        const categoryRepoistory = new InmemCategoryRepository();
        const service = new CatalogService(itemRepository, categoryRepoistory);

        const { result: items } = await service.listItems();

        expect(items).toEqual([]);
    });
});

describe("Test Searchitems", () => {
    it("Deve chamar o método **search** no repositório de artigos", async () => {
        const itemRepository = new ItemRepositoryStub();
        const categoryRepoistory = new InmemCategoryRepository();
        const service = new CatalogService(itemRepository, categoryRepoistory);
        const spy = vi.spyOn(itemRepository, "search");

        await service.searchItems("Teste");

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith("Teste", 1, 12);
    });

    it("Deve pesquisar o artigo pelo seu nome", async () => {
        const itemRepository = new ItemRepositoryStub();
        const categoryRepoistory = new InmemCategoryRepository();
        const service = new CatalogService(itemRepository, categoryRepoistory);

        const { result: items } = await service.searchItems("Teste");

        expect(items.length).toBeGreaterThanOrEqual(2);
        expect(items[0].itemId.toString()).toEqual("1001");
    });

    it("Deve pesquisar o artigo pelo seu identificador", async () => {
        const itemRepository = new ItemRepositoryStub();
        const categoryRepoistory = new InmemCategoryRepository();
        const service = new CatalogService(itemRepository, categoryRepoistory);

        const { result: items } = await service.searchItems("1002");

        expect(items.length).toBeGreaterThanOrEqual(1);
        expect(items[0].itemId.toString()).toEqual("1002");
    });

    it("Deve retornar um array vazio se não existir artigos", async () => {
        const itemRepository = new InmemItemRepository();
        const categoryRepoistory = new InmemCategoryRepository();
        const service = new CatalogService(itemRepository, categoryRepoistory);

        const { result: items } = await service.searchItems("Teste");

        expect(items).toEqual([]);
    });

    it("Deve paginar o resultado da listagem de artigos por 12 artigos por página", async () => {
        const itemRepository = new ItemRepositoryStub();
        const categoryRepoistory = new InmemCategoryRepository();
        const service = new CatalogService(itemRepository, categoryRepoistory);

        const items = await service.listItems();

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.pageToken).toEqual(1);
        expect(items.perPage).toEqual(12);
    });

    it("Deve buscar os artigos pela página", async () => {
        const pageToken = 2;
        const itemRepository = new ItemRepositoryStub();
        const categoryRepoistory = new InmemCategoryRepository();
        const service = new CatalogService(itemRepository, categoryRepoistory);

        const items = await service.listItems(pageToken);

        expect(items.result.length).toEqual(0);
        expect(items.pageToken).toEqual(2);
        expect(items.perPage).toEqual(12);
    });

    it("Deve buscar por um tamanho de página diferente de 12", async () => {
        const pageToken = 1;
        const perPage = 30;
        const itemRepository = new ItemRepositoryStub();
        const categoryRepoistory = new InmemCategoryRepository();
        const service = new CatalogService(itemRepository, categoryRepoistory);

        const items = await service.listItems(pageToken, perPage);

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.pageToken).toEqual(1);
        expect(items.perPage).toEqual(perPage);
    });

    it("Deve paginar o resultado da pesquisa de artigos por 12 artigos por página", async () => {
        const itemRepository = new ItemRepositoryStub();
        const categoryRepoistory = new InmemCategoryRepository();
        const service = new CatalogService(itemRepository, categoryRepoistory);

        const items = await service.searchItems("Teste");

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.pageToken).toEqual(1);
        expect(items.perPage).toEqual(12);
    });

    it("Deve paginar o resultado da pesquisa por um tamanho de página diferente de 12", async () => {
        const perPage = 30;
        const itemRepository = new ItemRepositoryStub();
        const categoryRepoistory = new InmemCategoryRepository();
        const service = new CatalogService(itemRepository, categoryRepoistory);

        const items = await service.searchItems("Teste", 1, perPage);

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.pageToken).toEqual(1);
        expect(items.perPage).toEqual(perPage);
    });

    it("Deve paginar o resultado da pesquisa pelo número da página", async () => {
        const pageToken = 2;
        const itemRepository = new ItemRepositoryStub();
        const categoryRepoistory = new InmemCategoryRepository();
        const service = new CatalogService(itemRepository, categoryRepoistory);

        const items = await service.searchItems("Teste", pageToken, 12);

        expect(items.result.length).toEqual(0);
        expect(items.pageToken).toEqual(2);
        expect(items.perPage).toEqual(12);
    });
});

describe("Test Get Categorias ", () => {
    it("Deve buscar as categorias existentes", async () => {
        const categoryRepoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        await categoryRepoistory.save(category);
        const service = new CatalogService(itemRepository, categoryRepoistory);

        const categories = await service.getCategories();

        expect(categories.length).toEqual(1);
        expect(categories[0].name).toEqual("Categoria 1");
    });

    it("Deve retornar um array vazio caso não exista categorias", async () => {
        const categoryRepoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const service = new CatalogService(itemRepository, categoryRepoistory);

        const categories = await service.getCategories();

        expect(categories.length).toEqual(0);
    });
});

const category = Category.create({
    department: "Departamento 1",
    subcategory: {
        subcategoryId: ID.RandomUUID(),
        name: "Subcategoria 1",
    },
    name: "Categoria 1",
});
