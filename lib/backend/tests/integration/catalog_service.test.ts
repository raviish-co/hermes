import { InmemItemCategoryRepository } from "../../persistense/inmem/inmem_item_category_repository";
import { InmemVariationRepository } from "../../persistense/inmem/inmem_variation_repository";
import { CatalogService } from "../../application/catalog_service";
import { ItemCategoryRepositoryStub } from "../stubs/item_repository_stub";
import { Variation } from "../../domain/catalog/variation";
import { describe, it, vi, expect } from "vitest";
import { ID } from "../../shared/id";

describe("Test ListItems", () => {
    it("Deve chamar o método **list** no repositório de artigos", async () => {
        const itemRepository = new ItemCategoryRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const service = new CatalogService(itemRepository, variationRepository);

        const spy = vi.spyOn(itemRepository, "list");

        await service.listItems();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Deve buscar os artigos no repositório", async () => {
        const itemRepository = new ItemCategoryRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const service = new CatalogService(itemRepository, variationRepository);

        const { result: items } = await service.listItems();

        expect(items.length).toBeGreaterThanOrEqual(2);
        expect(items[0].itemId.toString()).toEqual("1001");
    });

    it("Deve retornar um array vazio se não existir artigos", async () => {
        const itemRepository = new InmemItemCategoryRepository();
        const variationRepository = new InmemVariationRepository();
        const service = new CatalogService(itemRepository, variationRepository);

        const { result: items } = await service.listItems();

        expect(items).toEqual([]);
    });
});

describe("Test SearchItems", () => {
    it("Deve chamar o método **search** no repositório de artigos", async () => {
        const itemRepository = new ItemCategoryRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const service = new CatalogService(itemRepository, variationRepository);

        const spy = vi.spyOn(itemRepository, "search");

        await service.searchItems("Teste");

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith("Teste", 1, 12);
    });

    it("Deve pesquisar o artigo pelo seu nome", async () => {
        const itemRepository = new ItemCategoryRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const service = new CatalogService(itemRepository, variationRepository);

        const { result: items } = await service.searchItems("T-shirt");

        expect(items.length).toBeGreaterThanOrEqual(1);
        expect(items[0].itemId.toString()).toEqual("1001");
    });

    it("Deve pesquisar o artigo pelo seu identificador", async () => {
        const itemRepository = new ItemCategoryRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const service = new CatalogService(itemRepository, variationRepository);

        const { result: items } = await service.searchItems("1002");

        expect(items.length).toBeGreaterThanOrEqual(1);
        expect(items[0].itemId.toString()).toEqual("1002");
    });

    it("Deve retornar um array vazio se não existir artigos", async () => {
        const itemRepository = new ItemCategoryRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const service = new CatalogService(itemRepository, variationRepository);

        const { result: items } = await service.searchItems("Teste");

        expect(items).toEqual([]);
    });

    it("Deve paginar o resultado da listagem de artigos por 12 artigos por página", async () => {
        const itemRepository = new ItemCategoryRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const service = new CatalogService(itemRepository, variationRepository);

        const items = await service.listItems();

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.pageToken).toEqual(1);
        expect(items.perPage).toEqual(12);
    });

    it("Deve buscar os artigos pela página", async () => {
        const pageToken = 2;
        const itemRepository = new ItemCategoryRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const service = new CatalogService(itemRepository, variationRepository);

        const items = await service.listItems(pageToken);

        expect(items.result.length).toEqual(0);
        expect(items.pageToken).toEqual(2);
        expect(items.perPage).toEqual(12);
    });

    it("Deve buscar por um tamanho de página diferente de 12", async () => {
        const pageToken = 1;
        const perPage = 30;
        const itemRepository = new ItemCategoryRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const service = new CatalogService(itemRepository, variationRepository);

        const items = await service.listItems(pageToken, perPage);

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.pageToken).toEqual(1);
        expect(items.perPage).toEqual(perPage);
    });

    it("Deve paginar o resultado da pesquisa de artigos por 12 artigos por página", async () => {
        const itemRepository = new ItemCategoryRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const service = new CatalogService(itemRepository, variationRepository);

        const items = await service.searchItems("T-shirt");

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.pageToken).toEqual(1);
        expect(items.perPage).toEqual(12);
    });

    it("Deve paginar o resultado da pesquisa por um tamanho de página diferente de 12", async () => {
        const perPage = 30;
        const itemRepository = new ItemCategoryRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const service = new CatalogService(itemRepository, variationRepository);

        const items = await service.searchItems("T-shirt", 1, perPage);

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.pageToken).toEqual(1);
        expect(items.perPage).toEqual(perPage);
    });

    it("Deve paginar o resultado da pesquisa pelo número da página", async () => {
        const pageToken = 2;
        const itemRepository = new ItemCategoryRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const service = new CatalogService(itemRepository, variationRepository);

        const items = await service.searchItems("Teste", pageToken, 12);

        expect(items.result.length).toEqual(0);
        expect(items.pageToken).toEqual(2);
        expect(items.perPage).toEqual(12);
    });

    it("Deve pesquisar os items pelo campo fulltext", async () => {
        const query = "Preto";
        const itemRepository = new ItemCategoryRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const service = new CatalogService(itemRepository, variationRepository);

        const items = await service.searchItems(query);

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.result[0].name).toEqual("T-shirt desportiva gola redonda");
    });

    it("Deve pesquisar os items pelo campo fulltext com letras minúsculas", async () => {
        const query = "preto";
        const itemRepository = new ItemCategoryRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const service = new CatalogService(itemRepository, variationRepository);

        const items = await service.searchItems(query);

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.result[0].name).toEqual("T-shirt desportiva gola redonda");
    });
});

describe("Test Get All Variations", () => {
    it("Deve recuperar as variações da base de dados", async () => {
        const itemRepository = new ItemCategoryRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        variationRepository.save(variation);

        const service = new CatalogService(itemRepository, variationRepository);

        const variations = await service.getVariations();

        expect(variations.length).toBeGreaterThanOrEqual(1);
    });
});

const variation = new Variation(ID.New("1"), "Cor", ["Preto", "Branco", "Vermelho"]);
