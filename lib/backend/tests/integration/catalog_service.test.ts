import { InmemVariationRepository } from "../../persistense/inmem/inmem_variation_repository";
import { InmemItemRepository } from "../../persistense/inmem/inmem_item_repository";
import { CatalogService } from "../../application/catalog_service";
import { ItemRepositoryStub } from "../stubs/item_repository_stub";
import { Variation } from "../../domain/catalog/variations/variation";
import { describe, it, expect } from "vitest";
import { ID } from "../../shared/id";
import { SequenceGenerator } from "../../adapters/sequences/sequence_generator";
import { InmemSequenceStorage } from "../../persistense/inmem/inmem_sequence_storage";
import { CategoryRepositoryStub } from "../stubs/categoria_repository_stub";
import { InvalidVariations } from "../../domain/catalog/variations/invalid_variations_error";

describe("Test ListItems", () => {
    it("Deve buscar os artigos no repositório", async () => {
        const itemRepository = new ItemRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);
        const categoryRepository = new CategoryRepositoryStub();
        const service = new CatalogService(
            itemRepository,
            variationRepository,
            categoryRepository,
            generator
        );

        const { result: items } = await service.listItems();

        expect(items.length).toBeGreaterThanOrEqual(2);
        expect(items[0].itemId.toString()).toEqual("1001");
    });

    it("Deve retornar um array vazio se não existir artigos", async () => {
        const itemRepository = new InmemItemRepository();
        const variationRepository = new InmemVariationRepository();
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);
        const categoryRepository = new CategoryRepositoryStub();
        const service = new CatalogService(
            itemRepository,
            variationRepository,
            categoryRepository,
            generator
        );

        const { result: items } = await service.listItems();

        expect(items).toEqual([]);
    });
});

describe("Test SearchItems", () => {
    it("Deve pesquisar o artigo pelo seu nome", async () => {
        const itemRepository = new ItemRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);
        const categoryRepository = new CategoryRepositoryStub();
        const service = new CatalogService(
            itemRepository,
            variationRepository,
            categoryRepository,
            generator
        );

        const { result: items } = await service.searchItems("T-shirt");

        expect(items.length).toBeGreaterThanOrEqual(1);
        expect(items[0].itemId.toString()).toEqual("1001");
    });

    it("Deve pesquisar o artigo pelo seu identificador", async () => {
        const itemRepository = new ItemRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);
        const categoryRepository = new CategoryRepositoryStub();
        const service = new CatalogService(
            itemRepository,
            variationRepository,
            categoryRepository,
            generator
        );

        const { result: items } = await service.searchItems("1002");

        expect(items.length).toBeGreaterThanOrEqual(1);
        expect(items[0].itemId.toString()).toEqual("1002");
    });

    it("Deve retornar um array vazio se não existir artigos", async () => {
        const itemRepository = new ItemRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);
        const categoryRepository = new CategoryRepositoryStub();
        const service = new CatalogService(
            itemRepository,
            variationRepository,
            categoryRepository,
            generator
        );

        const { result: items } = await service.searchItems("Teste");

        expect(items).toEqual([]);
    });

    it("Deve paginar o resultado da listagem de artigos por 12 artigos por página", async () => {
        const itemRepository = new ItemRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);
        const categoryRepository = new CategoryRepositoryStub();
        const service = new CatalogService(
            itemRepository,
            variationRepository,
            categoryRepository,
            generator
        );

        const items = await service.listItems();

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.pageToken).toEqual(1);
        expect(items.perPage).toEqual(12);
    });

    it("Deve buscar os artigos pela página", async () => {
        const pageToken = 2;
        const itemRepository = new ItemRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);
        const categoryRepository = new CategoryRepositoryStub();
        const service = new CatalogService(
            itemRepository,
            variationRepository,
            categoryRepository,
            generator
        );

        const items = await service.listItems(pageToken);

        expect(items.result.length).toEqual(0);
        expect(items.pageToken).toEqual(2);
        expect(items.perPage).toEqual(12);
    });

    it("Deve buscar por um tamanho de página diferente de 12", async () => {
        const pageToken = 1;
        const perPage = 30;
        const itemRepository = new ItemRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);
        const categoryRepository = new CategoryRepositoryStub();
        const service = new CatalogService(
            itemRepository,
            variationRepository,
            categoryRepository,
            generator
        );

        const items = await service.listItems(pageToken, perPage);

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.pageToken).toEqual(1);
        expect(items.perPage).toEqual(perPage);
    });

    it("Deve paginar o resultado da pesquisa de artigos por 12 artigos por página", async () => {
        const itemRepository = new ItemRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);
        const categoryRepository = new CategoryRepositoryStub();
        const service = new CatalogService(
            itemRepository,
            variationRepository,
            categoryRepository,
            generator
        );

        const items = await service.searchItems("T-shirt");

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.pageToken).toEqual(1);
        expect(items.perPage).toEqual(12);
    });

    it("Deve paginar o resultado da pesquisa por um tamanho de página diferente de 12", async () => {
        const perPage = 30;
        const itemRepository = new ItemRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);
        const categoryRepository = new CategoryRepositoryStub();
        const service = new CatalogService(
            itemRepository,
            variationRepository,
            categoryRepository,
            generator
        );

        const items = await service.searchItems("T-shirt", 1, perPage);

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.pageToken).toEqual(1);
        expect(items.perPage).toEqual(perPage);
    });

    it("Deve paginar o resultado da pesquisa pelo número da página", async () => {
        const pageToken = 2;
        const itemRepository = new ItemRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);
        const categoryRepository = new CategoryRepositoryStub();
        const service = new CatalogService(
            itemRepository,
            variationRepository,
            categoryRepository,
            generator
        );

        const items = await service.searchItems("Teste", pageToken, 12);

        expect(items.result.length).toEqual(0);
        expect(items.pageToken).toEqual(2);
        expect(items.perPage).toEqual(12);
    });

    it("Deve pesquisar os items pelo campo fulltext", async () => {
        const query = "Branco";
        const itemRepository = new ItemRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);
        const categoryRepository = new CategoryRepositoryStub();
        const service = new CatalogService(
            itemRepository,
            variationRepository,
            categoryRepository,
            generator
        );

        const items = await service.searchItems(query);

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.result[0].name).toEqual("T-shirt desportiva gola redonda");
    });

    it("Deve pesquisar os items pelo campo fulltext com letras minúsculas", async () => {
        const query = "branco";
        const itemRepository = new ItemRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);
        const categoryRepository = new CategoryRepositoryStub();
        const service = new CatalogService(
            itemRepository,
            variationRepository,
            categoryRepository,
            generator
        );

        const items = await service.searchItems(query);

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.result[0].name).toEqual("T-shirt desportiva gola redonda");
    });
});

describe("Test Get All Variations", () => {
    it("Deve recuperar as variações da base de dados", async () => {
        const itemRepository = new ItemRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);
        variationRepository.save(variation);

        const categoryRepository = new CategoryRepositoryStub();
        const service = new CatalogService(
            itemRepository,
            variationRepository,
            categoryRepository,
            generator
        );

        const variations = await service.getVariations();

        expect(variations.length).toBeGreaterThanOrEqual(1);
    });
});

describe("CatalogService - Registrar artigo", () => {
    it("Deve registrar o artigo no repositório", async () => {
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);
        const variationRepository = new InmemVariationRepository();
        const itemRepository = new InmemItemRepository();
        const categoryRepository = new CategoryRepositoryStub();
        const service = new CatalogService(
            itemRepository,
            variationRepository,
            categoryRepository,
            generator
        );

        const data = {
            name: "Camisa gola longa",
            price: 100,
        };

        await service.registerItem(data);

        await service.registerItem(data);

        const item = await itemRepository.last();

        expect(item.name).toEqual(data.name);
    });

    it("Deve registrar o artigo com o seu preço", async () => {
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);
        const variationRepository = new InmemVariationRepository();
        const itemRepository = new InmemItemRepository();
        const categoryRepository = new CategoryRepositoryStub();
        const service = new CatalogService(
            itemRepository,
            variationRepository,
            categoryRepository,
            generator
        );

        const data = {
            name: "Artigo 1",
            price: 1000,
        };

        await service.registerItem(data);

        const item = await itemRepository.last();

        expect(item.price.value).toEqual(data.price);
    });

    it("Deve registrar a condição do artigo", async () => {
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);
        const variationRepository = new InmemVariationRepository();
        const itemRepository = new InmemItemRepository();
        const categoryRepository = new CategoryRepositoryStub();
        const service = new CatalogService(
            itemRepository,
            variationRepository,
            categoryRepository,
            generator
        );

        const data = {
            name: "Artigo 1",
            price: 100,
        };

        await service.registerItem(data);

        const item = await itemRepository.last();

        expect(item.getCondition().status).toEqual("Bom");
    });

    it("Deve modificar o estado do artigo para **Mau** quando tem uma nota a descrever os danos", async () => {
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);
        const variationRepository = new InmemVariationRepository();
        const itemRepository = new InmemItemRepository();
        const categoryRepository = new CategoryRepositoryStub();
        const service = new CatalogService(
            itemRepository,
            variationRepository,
            categoryRepository,
            generator
        );

        const data = {
            name: "Artigo 1",
            price: 100,
            comment: "Danificado",
        };

        await service.registerItem(data);

        const item = await itemRepository.last();

        expect(item.getCondition().status).toEqual("Mau");
        expect(item.getCondition().comment).toEqual("Danificado");
    });

    it("Deve gerar o identificador do artigo", async () => {
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage, 1000);
        const variationRepository = new InmemVariationRepository();
        const itemRepository = new InmemItemRepository();
        const categoryRepository = new CategoryRepositoryStub();
        const service = new CatalogService(
            itemRepository,
            variationRepository,
            categoryRepository,
            generator
        );
        const data = {
            name: "Artigo 1",
            price: 100,
        };

        await service.registerItem(data);

        const item = await itemRepository.last();

        expect(item.itemId.toString()).toEqual("RVS - 1000");
    });

    it("Deve registrar o artigo com a categoria", async () => {
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);
        const variationRepository = new InmemVariationRepository();
        const itemRepository = new InmemItemRepository();
        const categoryRepository = new CategoryRepositoryStub();
        const service = new CatalogService(
            itemRepository,
            variationRepository,
            categoryRepository,
            generator
        );

        const data = {
            name: "Artigo 1",
            price: 100,
            categoryId: "1",
            variations: [
                { variationId: "1", name: "Cor", value: "Preto" },
                { variationId: "2", name: "Tamanho", value: "M" },
            ],
        };

        await service.registerItem(data);

        const item = await itemRepository.last();

        expect(item.categoryId?.toString()).toEqual(data.categoryId);
    });

    it("Deve registrar as variações do artigo", async () => {
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);
        const variationRepository = new InmemVariationRepository();
        const itemRepository = new InmemItemRepository();
        const categoryRepository = new CategoryRepositoryStub();
        const service = new CatalogService(
            itemRepository,
            variationRepository,
            categoryRepository,
            generator
        );

        const data = {
            name: "Artigo 1",
            price: 100,
            categoryId: "1",
            variations: [
                { variationId: "1", name: "Cor", value: "Preto" },
                { variationId: "2", name: "Tamanho", value: "M" },
            ],
        };

        await service.registerItem(data);

        const item = await itemRepository.last();

        const variations = Object.entries(item.variations!);

        expect(variations[0]).toEqual(["1", "Cor: Preto"]);
        expect(variations[1]).toEqual(["2", "Tamanho: M"]);
    });

    it("Deve retornar erro **InvalidVariations** quando escolher a categoria, mas não informar as variações", async () => {
        const storage = new InmemSequenceStorage();
        const generator = new SequenceGenerator(storage);
        const variationRepository = new InmemVariationRepository();
        const itemRepository = new InmemItemRepository();
        const categoryRepository = new CategoryRepositoryStub();
        const service = new CatalogService(
            itemRepository,
            variationRepository,
            categoryRepository,
            generator
        );
        const data = {
            name: "Artigo 1",
            price: 100,
            categoryId: "1",
        };

        const error = await service.registerItem(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidVariations);
    });
});

const variation = new Variation(ID.fromString("1"), "Cor", ["Preto", "Branco", "Vermelho"]);
