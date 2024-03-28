import { InmemCategoryRepository } from "../../persistense/inmem/inmem_category_repository";
import { InmemSectionRepository } from "../../persistense/inmem/inmem_section_repository";
import { InmemSequenceStorage } from "../../persistense/inmem/inmem_sequence_storage";
import { InmemItemRepository } from "../../persistense/inmem/inmem_item_repository";
import { InvalidFileHeader } from "../../domain/readers/invalid_file_header_error";
import { CategoryNotFound } from "../../domain/catalog/category_not_found_error";
import { FileNotSupported } from "../../domain/readers/file_not_supported_error";
import { SectionNotFound } from "../../domain/catalog/section_not_found_error";
import { SequenceGenerator } from "../../domain/sequences/sequence_generator";
import { VariationRepositoryStub } from "../stubs/variation_repository_stub";
import { VariationNotFound } from "../../domain/catalog/variation_not_found_error";
import { InmemVariationRepository } from "../../persistense/inmem/inmem_variation_repository";
import { InvalidVariationFormat } from "../../domain/catalog/invalid_variation_format_error";
import type { CategoryRepository } from "../../domain/catalog/category_repository";
import type { SectionRepository } from "../../domain/catalog/section_repository";
import type { VariationRepository } from "../../domain/catalog/variation_repository";
import { FileEmpty } from "../../domain/readers/file_empty_error";
import { ImportService } from "../../application/import_service";
import { Category } from "../../domain/catalog/category";
import { Section } from "../../domain/catalog/section";
import { Status } from "../../domain/catalog/item";
import { describe, it, expect } from "vitest";
import { ID } from "../../shared/id";

describe("Test Upload Items", async () => {
    it("Deve retornar **FileNotSupported** caso o ficheiro não seja .csv", async () => {
        const { service } = makeService();

        const error = await service.uploadItems(fileTxt);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(FileNotSupported);
    });

    it("Deve retornar **InvalidFileHeader** caso o cabeçalho não esteja completo", async () => {
        const { service } = makeService();

        const error = await service.uploadItems(fileHeader);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidFileHeader);
    });

    it("Deve retonar **EmptyFile** caso o ficheiro seja válido e esteja vazio", async () => {
        const { service } = makeService();

        const error = await service.uploadItems(emptyFile);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(FileEmpty);
    });

    it("Deve retornar **CategoryNotFound** se não encontrar a categoria no repositório", async () => {
        const { service } = makeService();

        const error = await service.uploadItems(file);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(CategoryNotFound);
    });

    it("Deve retornar **SectionNotFound** se não encontrar a seção no repositório", async () => {
        const { service, categoryRepository } = makeService();
        await categoryRepository.save(category);

        await service.uploadItems(file);

        const error = await service.uploadItems(file);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(SectionNotFound);
    });

    it("Deve retornar **VariationNotFound** se não encontrar a variação no repositório", async () => {
        const variationRepository = new InmemVariationRepository();
        const { service, categoryRepository, sectionRepository } = makeService({
            variationRepository,
        });
        await categoryRepository.save(category);
        await sectionRepository.save(section);

        const error = await service.uploadItems(file);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(VariationNotFound);
    });

    it("Deve carregar os artigos a partir do ficheiro .csv", async () => {
        const { service, itemRepository, categoryRepository, sectionRepository } = makeService();
        await categoryRepository.save(category);
        await sectionRepository.save(section);

        await service.uploadItems(file);

        const { result: items } = await itemRepository.list(1, 12);

        expect(items.length).toBe(5);
    });

    it("Deve associar o ID da categoria ao artigo a ser importado", async () => {
        const { service, itemRepository, categoryRepository, sectionRepository } = makeService();
        await categoryRepository.save(category);
        await sectionRepository.save(section);

        await service.uploadItems(file);

        const item = await itemRepository.last();

        expect(item.categoryId?.toString()).toBeDefined();
    });

    it("Deve associar o ID da seção ao artigo a ser importado", async () => {
        const { service, itemRepository, categoryRepository, sectionRepository } = makeService();
        await categoryRepository.save(category);
        await sectionRepository.save(section);

        await service.uploadItems(file);

        const item = await itemRepository.last();

        expect(item.sectionId).toBeDefined();
    });

    it("Deve associar o ID da variação com o seu valor ao artigo a ser importado", async () => {
        const { service, itemRepository, categoryRepository, sectionRepository } = makeService();
        await categoryRepository.save(category);
        await sectionRepository.save(section);

        await service.uploadItems(file);

        const item = await itemRepository.last();

        expect(item.variations!["1"]).toBeDefined();
        expect(item.variations!["1"]).toEqual("Cor: Preto");
    });

    it("Deve retornar **InvalidVariationFormat** se a variação não estiver no formato correto", async () => {
        const { service } = makeService();

        const file = new File([variationFormatData], "filename.csv", { type: "text/csv" });

        const error = await service.uploadItems(file);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidVariationFormat);
    });

    it("Deve associar várias variações ao artigo a ser importado", async () => {
        const { service, itemRepository, categoryRepository, sectionRepository } = makeService();
        await categoryRepository.save(category);
        await sectionRepository.save(section);

        await service.uploadItems(file);

        const item = await itemRepository.last();

        expect(item.variations!["1"]).toBeDefined();
        expect(item.variations!["1"]).toEqual("Cor: Preto");
        expect(item.variations!["2"]).toBeDefined();
        expect(item.variations!["2"]).toEqual("Marca: Rebock");
    });

    it("Deve gerar o ID para os items ao serem carragados na base de dados", async () => {
        const { service, itemRepository, categoryRepository, sectionRepository } = makeService();
        await categoryRepository.save(category);
        await sectionRepository.save(section);

        await service.uploadItems(file);

        const { result: items } = await itemRepository.list(1, 12);

        expect(items[0].itemId.toString()).toEqual("RVS - 0001");
        expect(items[1].itemId.toString()).toEqual("RVS - 0002");
        expect(items[2].itemId.toString()).toEqual("RVS - 0003");
        expect(items[3].itemId.toString()).toEqual("RVS - 0004");
        expect(items[4].itemId.toString()).toEqual("RVS - 0005");
    });

    it("Deve adicionar o comentario ao estado do item caso seja definido", async () => {
        const { service, itemRepository, categoryRepository, sectionRepository } = makeService();
        await categoryRepository.save(category);
        await sectionRepository.save(section);

        await service.uploadItems(file);

        const { result: items } = await itemRepository.list(1, 12);

        expect(items[0].getCondition().status).toEqual(Status.Bad);
        expect(items[0].getCondition().comment).toEqual("some-comment");
        expect(items[1].getCondition().status).toEqual(Status.Bad);
        expect(items[1].getCondition().comment).toEqual("some-comment");
    });
});

const category = new Category(ID.random(), "Categoria 1");
const section = new Section(ID.random(), "Secao 1", ID.random());

const csvData = `nome,preco,quantidade,estado,categoria,seccao,variacoes
Produto 1,100.00,1,some-comment,Categoria 1,Secao 1,Cor=Preto;Marca=Nike
Produto 2,200.00,2,some-comment,Categoria 1,Secao 1,Cor=Preto;Marca=Rebock
Produto 3,300.00,3,some-comment,Categoria 1,Secao 1,Cor=Preto;Marca=Adidas
Produto 4,400.00,4,some-comment,Categoria 1,Secao 1,Cor=Preto;Marca=Nike
Produto 5,500.00,5,some-comment,Categoria 1,Secao 1,Cor=Preto;Marca=Rebock`;

const variationFormatData = `nome,preco,quantidade,estado,categoria,seccao,variacoes
Produto 1,100.00,1,some-comment,Categoria 1,Secao 1,Cor-Preto`;

const file = new File([csvData], "filename.csv", { type: "text/csv" });

const fileHeader = new File(["nome,invali_field"], "filename.csv", {
    type: "text/csv",
});
const fileTxt = new File([], "filename.txt", { type: "text/plain" });
const emptyFile = new File(
    ["nome,preco,quantidade,estado,categoria,seccao,variacoes"],
    "filename.csv",
    {
        type: "text/csv",
    }
);

interface Dependencies {
    categoryRepository?: CategoryRepository;
    sectionRepository?: SectionRepository;
    variationRepository?: VariationRepository;
}

function makeService(deps?: Dependencies) {
    const storage = new InmemSequenceStorage();
    const sequenceGenerator = new SequenceGenerator(storage);
    const itemRepository = new InmemItemRepository();
    const categoryRepository = deps?.categoryRepository ?? new InmemCategoryRepository();
    const sectionRepository = deps?.sectionRepository ?? new InmemSectionRepository();
    const variationRepository = deps?.variationRepository ?? new VariationRepositoryStub();

    const service = new ImportService(
        itemRepository,
        categoryRepository,
        sectionRepository,
        variationRepository,
        sequenceGenerator
    );

    return {
        service,
        itemRepository,
        categoryRepository,
        sectionRepository,
        variationRepository,
    };
}
