import { describe, expect, it } from "vitest";
import { CategoryNotFound } from "../../../domain/catalog/categories/category_not_found_error";
import { SectionNotFound } from "../../../domain/catalog/departments/section_not_found_error";
import { Item } from "../../../domain/catalog/items/item";
import { ItemNotFound } from "../../../domain/catalog/items/item_not_found_error";
import { VariationNotFound } from "../../../domain/catalog/variations/variation_not_found_error";
import { Decimal } from "../../../shared/decimal";
import { ID } from "../../../shared/id";
import { CategoryRepositoryStub } from "../../stubs/category_repository_stub";
import { ItemRepositoryStub } from "../../stubs/item_repository_stub";
import { SectionRepositoryStub } from "../../stubs/section_repository_stub";
import { VariationRepositoryStub } from "../../stubs/variation_repository_stub";
import { catalogService } from "./service";

describe("CatalogService - Recuperar artigos", () => {
    it("Deve buscar os artigos no repositório", async () => {
        const itemRepository = new ItemRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();
        const { service } = catalogService({
            categoryRepository,
            itemRepository,
        });

        const { result: items } = await service.listItems();

        expect(items.length).toBeGreaterThanOrEqual(2);
        expect(items[0].itemId.toString()).toEqual("1016");
    });

    it("Deve retornar um array vazio se não existir artigos", async () => {
        const categoryRepository = new CategoryRepositoryStub();
        const { service } = catalogService({ categoryRepository });

        const { result: items } = await service.listItems();

        expect(items).toEqual([]);
    });
});

describe("CatalogService - Pesquisar artigos", () => {
    it("Deve pesquisar o artigo pelo seu nome", async () => {
        const itemRepository = new ItemRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();
        const { service } = catalogService({
            categoryRepository,
            itemRepository,
        });

        const { result: items } = await service.searchItems("T-shirt");

        expect(items.length).toBeGreaterThanOrEqual(1);
        expect(items[0].itemId.toString()).toEqual("1001");
    });

    it("Deve pesquisar o artigo pelo seu identificador", async () => {
        const itemRepository = new ItemRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();
        const { service } = catalogService({
            categoryRepository,
            itemRepository,
        });

        const { result: items } = await service.searchItems("1002");

        expect(items.length).toBeGreaterThanOrEqual(1);
        expect(items[0].itemId.toString()).toEqual("1002");
    });

    it("Deve retornar um array vazio se não existir artigos", async () => {
        const itemRepository = new ItemRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();
        const { service } = catalogService({
            categoryRepository,
            itemRepository,
        });

        const { result: items } = await service.searchItems("Teste");

        expect(items).toEqual([]);
    });

    it("Deve paginar o resultado da listagem de artigos por 12 artigos por página", async () => {
        const itemRepository = new ItemRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();
        const { service } = catalogService({
            categoryRepository,
            itemRepository,
        });

        const items = await service.listItems();

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.pageToken).toEqual(1);
        expect(items.perPage).toEqual(12);
    });

    it("Deve buscar os artigos pela página", async () => {
        const pageToken = 2;
        const itemRepository = new ItemRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();
        const { service } = catalogService({
            categoryRepository,
            itemRepository,
        });

        const items = await service.listItems(pageToken);

        expect(items.result.length).toEqual(3);
        expect(items.pageToken).toEqual(2);
        expect(items.perPage).toEqual(12);
    });

    it("Deve buscar por um tamanho de página diferente de 12", async () => {
        const pageToken = 1;
        const perPage = 30;
        const itemRepository = new ItemRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();
        const { service } = catalogService({
            categoryRepository,
            itemRepository,
        });

        const items = await service.listItems(pageToken, perPage);

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.pageToken).toEqual(1);
        expect(items.perPage).toEqual(perPage);
    });

    it("Deve paginar o resultado da pesquisa de artigos por 12 artigos por página", async () => {
        const itemRepository = new ItemRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();
        const { service } = catalogService({
            categoryRepository,
            itemRepository,
        });

        const items = await service.searchItems("T-shirt");

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.pageToken).toEqual(1);
        expect(items.perPage).toEqual(12);
    });

    it("Deve paginar o resultado da pesquisa por um tamanho de página diferente de 12", async () => {
        const perPage = 30;
        const itemRepository = new ItemRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();
        const { service } = catalogService({
            categoryRepository,
            itemRepository,
        });

        const items = await service.searchItems("T-shirt", 1, perPage);

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.pageToken).toEqual(1);
        expect(items.perPage).toEqual(perPage);
    });

    it("Deve paginar o resultado da pesquisa pelo número da página", async () => {
        const pageToken = 2;
        const itemRepository = new ItemRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();
        const { service } = catalogService({
            categoryRepository,
            itemRepository,
        });

        const items = await service.searchItems("Teste", pageToken, 12);

        expect(items.result.length).toEqual(0);
        expect(items.pageToken).toEqual(2);
        expect(items.perPage).toEqual(12);
    });

    it("Deve pesquisar os items pelo campo fulltext", async () => {
        const query = "Branco";
        const itemRepository = new ItemRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();
        const { service } = catalogService({
            categoryRepository,
            itemRepository,
        });

        const items = await service.searchItems(query);

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.result[0].name).toEqual("T-shirt desportiva gola redonda");
    });

    it("Deve pesquisar os items pelo campo fulltext com letras minúsculas", async () => {
        const query = "branco";
        const itemRepository = new ItemRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();
        const { service } = catalogService({
            categoryRepository,
            itemRepository,
        });

        const items = await service.searchItems(query);

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.result[0].name).toEqual("T-shirt desportiva gola redonda");
    });

    it("Deve pesquirar items por tags", async () => {
        const itemRepository = new ItemRepositoryStub();

        const { service } = catalogService({ itemRepository });

        const { result: items } = await service.searchItems("Verão");

        expect(items.length).toBeGreaterThanOrEqual(1);
        expect(items[0].itemId.toString()).toEqual("1004");
    });

    it("Deve pesquisar items pelo seu ID com letras minúsculas", async () => {
        const { service, itemRepository } = catalogService();
        await itemRepository.save(item);

        const { result: items } = await service.searchItems("rvs");

        expect(items.length).toBeGreaterThanOrEqual(1);
        expect(items[0].itemId.toString()).toEqual("RVS - 10001");
    });
});

describe("CatalogService - Registar artigo", () => {
    it("Deve registar o artigo no repositório", async () => {
        const categoryRepository = new CategoryRepositoryStub();
        const { service, itemRepository } = catalogService({
            categoryRepository,
        });

        const data = {
            name: "Camisa gola longa",
            price: 100,
        };

        await service.registerItem(data);

        await service.registerItem(data);

        const item = await itemRepository.last();

        expect(item.name).toEqual(data.name);
    });

    it("Deve registar o artigo com o seu preço", async () => {
        const categoryRepository = new CategoryRepositoryStub();
        const { service, itemRepository } = catalogService({
            categoryRepository,
        });

        const data = {
            name: "Artigo 1",
            price: 1000,
        };

        await service.registerItem(data);

        const item = await itemRepository.last();

        expect(item.price.value).toEqual(data.price);
    });

    it("Deve gerar o identificador do artigo", async () => {
        const categoryRepository = new CategoryRepositoryStub();
        const { service, itemRepository } = catalogService({
            categoryRepository,
        });

        const data = {
            name: "Artigo 1",
            price: 100,
        };

        await service.registerItem(data);

        const item = await itemRepository.last();

        expect(item.itemId.toString()).toEqual("RVS - 1000");
    });

    it("Deve registar o artigo com a categoria", async () => {
        const variationRepository = new VariationRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();

        const { service, itemRepository } = catalogService({
            variationRepository,
            categoryRepository,
        });

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

        expect(item.categoryId).toBeDefined();
        expect(item.categoryId!.toString()).toEqual(data.categoryId);
    });

    it("Deve retornar **CategoryNotFound** se o ID da categoria não for encontrada no repositório", async () => {
        const itemRepository = new ItemRepositoryStub();
        const { service } = catalogService({ itemRepository });

        const data = {
            name: "Calça social de linho",
            price: 10500,
            categoryId: "2010",
        };

        const error = await service.registerItem(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(CategoryNotFound);
    });

    it("Deve registar as variações do artigo", async () => {
        const variationRepository = new VariationRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();
        const { service, itemRepository } = catalogService({
            variationRepository,
            categoryRepository,
        });

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

    it("Deve retornar erro **VariationNotFound** se uma variação não for encontrada no repositório", async () => {
        const categoryRepository = new CategoryRepositoryStub();
        const { service } = catalogService({ categoryRepository });

        const data = {
            name: "Artigo 1",
            price: 100,
            categoryId: "1",
            variations: [{ variationId: "10", name: "Tamanho", value: "M" }],
        };

        const error = await service.registerItem(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(VariationNotFound);
    });

    it("Deve registar o artigo com a sua secção", async () => {
        const categoryRepository = new CategoryRepositoryStub();
        const sectionRepository = new SectionRepositoryStub();
        const { service, itemRepository } = catalogService({
            categoryRepository,
            sectionRepository,
        });

        const data = {
            name: "Artigo 1",
            price: 100,
            sectionId: "1",
        };

        await service.registerItem(data);

        const item = await itemRepository.last();

        expect(item.sectionId!.toString()).toEqual(data.sectionId);
    });

    it("Deve retornar erro **SectionNotFound** se a seção não for encontrada no repositório", async () => {
        const categoryRepository = new CategoryRepositoryStub();
        const { service } = catalogService({ categoryRepository });

        const data = {
            name: "Artigo 1",
            price: 100,
            sectionId: "1",
        };

        const error = await service.registerItem(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(SectionNotFound);
    });

    it("Deve registar o artigo com as suas tags", async () => {
        const { service, itemRepository } = catalogService();

        const data = {
            name: "Artigo 1",
            price: 100,
            tags: ["tag1", "tag2"],
        };

        await service.registerItem(data);

        const item = await itemRepository.last();

        expect(item.tags).toBeDefined();
        expect(item.tags).toEqual(data.tags);
    });
});

describe("CatalogService - Actualizar dados do artigo", () => {
    it("Deve actualizar nome e o preço do artigo no repositório", async () => {
        const itemRepository = new ItemRepositoryStub();
        const { service } = catalogService({ itemRepository });
        const itemId = "1001";

        const data = {
            name: "T-shirt preta gola circular",
            price: 15500,
        };

        await service.updateItem(itemId, data);

        const itemOrErr = await itemRepository.getById(ID.fromString(itemId));
        const item = <Item>itemOrErr.value;

        expect(item.name).toEqual(data.name);
        expect(item.price.value).toEqual(data.price);
    });

    it("Deve retornar **ItemNotFound** se o ID do artigo não for encontrado no repositório", async () => {
        const { service } = catalogService();

        const error = await service.updateItem("1000", { name: "T-shirt vermelha", price: 0 });

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(ItemNotFound);
    });

    it("Deve actualizar a secção do artigo no repositório", async () => {
        const itemRepository = new ItemRepositoryStub();
        const sectionRepository = new SectionRepositoryStub();
        const { service } = catalogService({ itemRepository, sectionRepository });
        const itemId = "1001";

        const data = {
            name: "Calça social de linho",
            price: 10500,
            sectionId: "2",
        };

        await service.updateItem(itemId, data);

        const itemOrErr = await itemRepository.getById(ID.fromString(itemId));
        const item = <Item>itemOrErr.value;

        expect(item.sectionId).toBeDefined();
        expect(item.sectionId?.toString()).toEqual(data.sectionId);
    });

    it("Deve retornar **SectionNotFound** se o ID da secção não for encontrada no repositório", async () => {
        const itemRepository = new ItemRepositoryStub();
        const { service } = catalogService({ itemRepository });
        const itemId = "1001";

        const data = {
            name: "Calça social de linho",
            price: 10500,
            sectionId: "2010",
        };

        const error = await service.updateItem(itemId, data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(SectionNotFound);
    });

    it("Deve actualizar as tags do artigo no repositório", async () => {
        const itemRepository = new ItemRepositoryStub();
        const sectionRepository = new SectionRepositoryStub();
        const { service } = catalogService({ itemRepository, sectionRepository });
        const itemId = "1001";

        const data = {
            name: "Calça social de linho",
            price: 10500,
            sectionId: "1",
            tags: ["Social", "Gala", "Executivo"],
        };

        await service.updateItem(itemId, data);

        const itemOrErr = await itemRepository.getById(ID.fromString(itemId));
        const item = <Item>itemOrErr.value;

        expect(item.tags).toBeDefined();
        expect(item.tags?.length).toBe(3);
        expect(item.tags).toEqual(data.tags);
    });

    it("Deve actualizar a categoria do artigo no repositório", async () => {
        const itemRepository = new ItemRepositoryStub();
        const sectionRepository = new SectionRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();
        const { service } = catalogService({
            itemRepository,
            sectionRepository,
            categoryRepository,
        });
        const itemId = "1002";

        const data = {
            name: "Calça social de linho",
            price: 1500,
            sectionId: "1",
            tags: ["Social", "Gala"],
            categoryId: "2",
        };

        await service.updateItem(itemId, data);

        const itemOrErr = await itemRepository.getById(ID.fromString(itemId));
        const item = <Item>itemOrErr.value;

        expect(item.categoryId).toBeDefined();
        expect(item.categoryId?.toString()).toEqual(data.categoryId);
    });

    it("Deve retornar **CategoryNotFound** se o ID da categoria não for encontrada no repositório", async () => {
        const itemRepository = new ItemRepositoryStub();
        const { service } = catalogService({ itemRepository });
        const itemId = "1001";

        const data = {
            name: "Calça social de linho",
            price: 10500,
            categoryId: "2010",
        };

        const error = await service.updateItem(itemId, data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(CategoryNotFound);
    });

    it("Deve retornar erro **VariationNotFound** se uma variação não for encontrada no repositório", async () => {
        const categoryRepository = new CategoryRepositoryStub();
        const itemRepository = new ItemRepositoryStub();
        const { service } = catalogService({ categoryRepository, itemRepository });
        const itemId = "1001";

        const data = {
            name: "Artigo 1",
            price: 100,
            categoryId: "1",
            variations: [{ variationId: "10", name: "Tamanho", value: "M" }],
        };

        const error = await service.updateItem(itemId, data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(VariationNotFound);
    });
});

describe("CatalogService - Recuperar artigo pelo ID", () => {
    it("Deve recuperar o artigo pelo seu ID", async () => {
        const itemRepository = new ItemRepositoryStub();
        const { service } = catalogService({ itemRepository });

        const itemOrErr = await service.getItem("1001");

        const item = <Item>itemOrErr.value;

        expect(item.itemId.toString()).toEqual("1001");
    });

    it('Deve retornar erro "ItemNotFound" se o artigo não existir', async () => {
        const { service } = catalogService();

        const error = await service.getItem("1002");

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(ItemNotFound);
    });
});

const item = new Item(
    ID.fromString("RVS - 10001"),
    "T-shirt desportiva gola redonda",
    new Decimal(100)
);
