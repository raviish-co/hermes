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
import { InmemCategoryRepository } from "../../persistense/inmem/inmem_category_repository";
import { CategoryAlreadyExists } from "../../domain/catalog/categories/category_already_exists_error";
import { VariationNotFound } from "../../domain/catalog/variations/variation_not_found_error";
import { VariationRepositoryStub } from "../stubs/variation_repository_stub";
import { SectionNotFound } from "../../domain/catalog/departments/section_not_found_error";
import { InmemSectionRepository } from "../../persistense/inmem/inmem_section_repository";
import { SectionRepositoryStub } from "../stubs/section_repository_stub";
import type { ItemRepository } from "../../domain/catalog/items/item_repository";
import type { VariationRepository } from "../../domain/catalog/variations/variation_repository";
import type { CategoryRepository } from "../../domain/catalog/categories/category_repository";
import type { SectionRepository } from "../../domain/catalog/departments/section_repository";
import { Item, Status } from "../../domain/catalog/items/item";
import { Decimal } from "../../shared/decimal";
import { ItemStock } from "../../domain/catalog/items/item_stock";

describe("CatalogService - Recuperar artigos", () => {
    it("Deve buscar os artigos no repositório", async () => {
        const itemRepository = new ItemRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();
        const { service } = makeService({
            categoryRepository,
            itemRepository,
        });

        const { result: items } = await service.listItems();

        expect(items.length).toBeGreaterThanOrEqual(2);
        expect(items[0].itemId.toString()).toEqual("1001");
    });

    it("Deve retornar um array vazio se não existir artigos", async () => {
        const categoryRepository = new CategoryRepositoryStub();
        const { service } = makeService({ categoryRepository });

        const { result: items } = await service.listItems();

        expect(items).toEqual([]);
    });
});

describe("CatalogService - Pesquisar artigos", () => {
    it("Deve pesquisar o artigo pelo seu nome", async () => {
        const itemRepository = new ItemRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();
        const { service } = makeService({
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
        const { service } = makeService({
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
        const { service } = makeService({
            categoryRepository,
            itemRepository,
        });

        const { result: items } = await service.searchItems("Teste");

        expect(items).toEqual([]);
    });

    it("Deve paginar o resultado da listagem de artigos por 12 artigos por página", async () => {
        const itemRepository = new ItemRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();
        const { service } = makeService({
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
        const { service } = makeService({
            categoryRepository,
            itemRepository,
        });

        const items = await service.listItems(pageToken);

        expect(items.result.length).toEqual(0);
        expect(items.pageToken).toEqual(2);
        expect(items.perPage).toEqual(12);
    });

    it("Deve buscar por um tamanho de página diferente de 12", async () => {
        const pageToken = 1;
        const perPage = 30;
        const itemRepository = new ItemRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();
        const { service } = makeService({
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
        const { service } = makeService({
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
        const { service } = makeService({
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
        const { service } = makeService({
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
        const { service } = makeService({
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
        const { service } = makeService({
            categoryRepository,
            itemRepository,
        });

        const items = await service.searchItems(query);

        expect(items.result.length).toBeGreaterThanOrEqual(1);
        expect(items.result[0].name).toEqual("T-shirt desportiva gola redonda");
    });

    it("Deve pesquirar items por tags", async () => {
        const itemRepository = new ItemRepositoryStub();

        const { service } = makeService({ itemRepository });

        const { result: items } = await service.searchItems("Verão");

        expect(items.length).toBeGreaterThanOrEqual(1);
        expect(items[0].itemId.toString()).toEqual("1004");
    });

    it("Deve pesquisar items pelo seu ID com letras minúsculas", async () => {
        const { service, itemRepository } = makeService();
        await itemRepository.save(item);

        const { result: items } = await service.searchItems("rvs");

        expect(items.length).toBeGreaterThanOrEqual(1);
        expect(items[0].itemId.toString()).toEqual("RVS - 10001");
    });
});

describe("CatalogService - Recuperar todas as variações", () => {
    it("Deve recuperar as variações da base de dados", async () => {
        const itemRepository = new ItemRepositoryStub();
        const variationRepository = new InmemVariationRepository();
        variationRepository.save(variation);

        const categoryRepository = new CategoryRepositoryStub();
        const { service } = makeService({
            categoryRepository,
            itemRepository,
            variationRepository,
        });

        const variations = await service.listVariations();

        expect(variations.length).toBeGreaterThanOrEqual(1);
    });
});

describe("CatalogService - Registrar artigo", () => {
    it("Deve registrar o artigo no repositório", async () => {
        const categoryRepository = new CategoryRepositoryStub();
        const { service, itemRepository } = makeService({
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

    it("Deve registrar o artigo com o seu preço", async () => {
        const categoryRepository = new CategoryRepositoryStub();
        const { service, itemRepository } = makeService({
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

    it("Deve registrar a condição do artigo", async () => {
        const categoryRepository = new CategoryRepositoryStub();
        const { service, itemRepository } = makeService({
            categoryRepository,
        });

        const data = {
            name: "Artigo 1",
            price: 100,
        };

        await service.registerItem(data);

        const item = await itemRepository.last();

        expect(item.getCondition().status).toEqual("Bom");
    });

    it("Deve modificar o estado do artigo para **Mau** quando tem uma nota a descrever os danos", async () => {
        const categoryRepository = new CategoryRepositoryStub();
        const { service, itemRepository } = makeService({
            categoryRepository,
        });

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
        const categoryRepository = new CategoryRepositoryStub();
        const { service, itemRepository } = makeService({
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

    it("Deve registrar o artigo com a categoria", async () => {
        const variationRepository = new VariationRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();

        const { service, itemRepository } = makeService({
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

    it("Deve registrar as variações do artigo", async () => {
        const variationRepository = new VariationRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();
        const { service, itemRepository } = makeService({
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
        const { service } = makeService({ categoryRepository });

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

    it("Deve registrar o artigo com a sua secção", async () => {
        const categoryRepository = new CategoryRepositoryStub();
        const sectionRepository = new SectionRepositoryStub();
        const { service, itemRepository } = makeService({ categoryRepository, sectionRepository });

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
        const { service } = makeService({ categoryRepository });

        const data = {
            name: "Artigo 1",
            price: 100,
            sectionId: "1",
        };

        const error = await service.registerItem(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(SectionNotFound);
    });

    it("Deve registrar o artigo com as suas tags", async () => {
        const { service, itemRepository } = makeService();

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

describe("CatalogService - Registrar categoria", () => {
    it("Deve registrar uma categoria", async () => {
        const itemRepository = new ItemRepositoryStub();

        const { service, categoryRepository } = makeService({ itemRepository });

        await service.registerCategory("");

        const categories = await categoryRepository.getAll();

        expect(categories.length).toEqual(1);
    });

    it("Deve registrar uma categoria com o seu nome no repositório", async () => {
        const name = "Sapatos";
        const itemRepository = new ItemRepositoryStub();

        const { service, categoryRepository } = makeService({ itemRepository });

        await service.registerCategory(name);

        const category = await categoryRepository.last();

        expect(category.name).toEqual(name);
    });

    it("Deve retornar erro **CategoryAlreadyExists** se a categoria já existir", async () => {
        const name = "Sapatos";
        const itemRepository = new ItemRepositoryStub();
        const categoryRepository = new CategoryRepositoryStub();

        const { service } = makeService({ itemRepository, categoryRepository });

        const error = await service.registerCategory(name);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(CategoryAlreadyExists);
    });

    it("Deve registar as variações da categoria", async () => {
        const name = "Sapatos";
        const variationsIds = ["1", "2"];
        const itemRepository = new ItemRepositoryStub();
        const variationRepository = new VariationRepositoryStub();
        const { service, categoryRepository } = makeService({
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

        const { service } = makeService({ itemRepository });

        const error = await service.registerCategory(name, variationsIds);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(VariationNotFound);
    });

    it("Deve gerar o identificador da categoria", async () => {
        const name = "Sapatos";
        const variationsIds = ["1", "2"];
        const itemRepository = new ItemRepositoryStub();
        const variationRepository = new VariationRepositoryStub();
        const { service, categoryRepository } = makeService({
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
        const { service, categoryRepository } = makeService({
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
        const { service } = makeService({ itemRepository, categoryRepository });

        const categorias = await service.listCategories();

        expect(categorias.length).toBeGreaterThanOrEqual(1);
    });
});

describe("CatalogService - Recuperar todas as secções", () => {
    it("Deve recuperar as secções do repositório", async () => {
        const sectionRepository = new SectionRepositoryStub();
        const { service } = makeService({ sectionRepository });

        const sections = await service.listSections();

        expect(sections.length).toBeGreaterThanOrEqual(1);
    });
});

const variation = new Variation(ID.fromString("1"), "Cor", ["Preto", "Branco", "Vermelho"]);
const item = new Item(
    ID.fromString("RVS - 10001"),
    "T-shirt desportiva gola redonda",
    new Decimal(100),
    new ItemStock(10),
    { status: Status.Good }
);

interface Dependecies {
    itemRepository?: ItemRepository;
    variationRepository?: VariationRepository;
    categoryRepository?: CategoryRepository;
    sectionRepository?: SectionRepository;
}

function makeService(deps?: Dependecies) {
    const storage = new InmemSequenceStorage();
    const generator = new SequenceGenerator(storage, 1000);

    const itemRepository = deps?.itemRepository ?? new InmemItemRepository();
    const variationRepository = deps?.variationRepository ?? new InmemVariationRepository();
    const categoryRepository = deps?.categoryRepository ?? new InmemCategoryRepository();
    const sectionRepository = deps?.sectionRepository ?? new InmemSectionRepository();

    const service = new CatalogService(
        itemRepository,
        variationRepository,
        categoryRepository,
        sectionRepository,
        generator
    );

    return { service, itemRepository, variationRepository, categoryRepository, sectionRepository };
}
