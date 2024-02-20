import { InmemCategoryRepository } from "../../persistense/inmem/inmem_category_repository";
import { InmemSectionRepository } from "../../persistense/inmem/inmem_section_repository";
import { InmemSequenceStorage } from "../../persistense/inmem/inmem_sequence_storage";
import { InmemItemRepository } from "../../persistense/inmem/inmem_item_repository";
import { InvalidFileHeader } from "../../domain/readers/invalid_file_header_error";
import { CategoryNotFound } from "../../domain/catalog/category_not_found_error";
import { FileNotSupported } from "../../domain/readers/file_not_supported_error";
import { SectionNotFound } from "../../domain/catalog/section_not_found_error";
import { SequenceGenerator } from "../../domain/sequences/sequence_generator";
import { FileEmpty } from "../../domain/readers/file_empty_error";
import { ImportService } from "../../application/import_service";
import { Category } from "../../domain/catalog/category";
import { Section } from "../../domain/catalog/section";
import { Status } from "../../domain/catalog/item";
import { describe, it, expect } from "vitest";
import { ID } from "../../shared/id";

describe("Test Upload Items", async () => {
    it("Deve retornar **FileNotSupported** caso o ficheiro não seja .csv", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const categoryRepoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const sectionRepository = new InmemSectionRepository();
        const service = new ImportService(
            itemRepository,
            categoryRepoistory,
            sectionRepository,
            sequenceGenerator
        );

        const error = await service.uploadItems(fileTxt);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(FileNotSupported);
    });

    it("Deve retornar **InvalidFileHeader** caso o cabeçalho não esteja completo", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const categoryRepoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const sectionRepository = new InmemSectionRepository();
        const service = new ImportService(
            itemRepository,
            categoryRepoistory,
            sectionRepository,
            sequenceGenerator
        );

        const error = await service.uploadItems(fileHeader);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidFileHeader);
    });

    it("Deve retonar **EmptyFile** caso o ficheiro seja válido e esteja vazio", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const categoryRepoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const sectionRepository = new InmemSectionRepository();
        const service = new ImportService(
            itemRepository,
            categoryRepoistory,
            sectionRepository,
            sequenceGenerator
        );

        const error = await service.uploadItems(emptyFile);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(FileEmpty);
    });

    it("Deve retornar **CategoryNotFound** se não encontrar a categoria no repositório", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const categoryRepoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const sectionRepository = new InmemSectionRepository();
        const service = new ImportService(
            itemRepository,
            categoryRepoistory,
            sectionRepository,
            sequenceGenerator
        );

        const error = await service.uploadItems(file);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(CategoryNotFound);
    });

    it("Deve retornar **SectionNotFound** se não encontrar a seção no repositório", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const categoryRepoistory = new InmemCategoryRepository();
        await categoryRepoistory.save(category);
        const itemRepository = new InmemItemRepository();
        const sectionRepository = new InmemSectionRepository();
        const service = new ImportService(
            itemRepository,
            categoryRepoistory,
            sectionRepository,
            sequenceGenerator
        );

        await service.uploadItems(file);

        const error = await service.uploadItems(file);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(SectionNotFound);
    });

    it("Deve carregar os artigos a partir do ficheiro .csv", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const categoryRepoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const sectionRepository = new InmemSectionRepository();
        await categoryRepoistory.save(category);
        await sectionRepository.save(section);
        const service = new ImportService(
            itemRepository,
            categoryRepoistory,
            sectionRepository,
            sequenceGenerator
        );

        await service.uploadItems(file);

        const { result: items } = await itemRepository.list(1, 12);

        expect(items.length).toBe(5);
    });

    it("Deve associar o ID da categoria ao artigo a ser importado", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const categoryRepoistory = new InmemCategoryRepository();
        await categoryRepoistory.save(category);
        const itemRepository = new InmemItemRepository();
        const sectionRepository = new InmemSectionRepository();
        await sectionRepository.save(section);
        const service = new ImportService(
            itemRepository,
            categoryRepoistory,
            sectionRepository,
            sequenceGenerator
        );

        await service.uploadItems(file);

        const item = await itemRepository.last();

        expect(item.categoryId).toBeDefined();
    });

    it("Deve gerar o ID para os items ao serem carragados na base de dados", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const categoryRepository = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const sectionRepository = new InmemSectionRepository();
        await categoryRepository.save(category);
        await sectionRepository.save(section);
        const service = new ImportService(
            itemRepository,
            categoryRepository,
            sectionRepository,
            sequenceGenerator
        );

        await service.uploadItems(file);

        const { result: items } = await itemRepository.list(1, 12);

        expect(items[0].itemId.toString()).toEqual("RVS - 0001");
        expect(items[1].itemId.toString()).toEqual("RVS - 0002");
        expect(items[2].itemId.toString()).toEqual("RVS - 0003");
        expect(items[3].itemId.toString()).toEqual("RVS - 0004");
        expect(items[4].itemId.toString()).toEqual("RVS - 0005");
    });

    it("Deve adicionar o comentario ao estado do item caso seja definido", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const categoryRepository = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const sectionRepository = new InmemSectionRepository();
        await categoryRepository.save(category);
        await sectionRepository.save(section);
        const service = new ImportService(
            itemRepository,
            categoryRepository,
            sectionRepository,
            sequenceGenerator
        );
        await service.uploadItems(file);

        const { result: items } = await itemRepository.list(1, 12);

        expect(items[0].getCondition().status).toEqual(Status.Bad);
        expect(items[0].getCondition().comment).toEqual("some-comment");
        expect(items[1].getCondition().status).toEqual(Status.Bad);
        expect(items[1].getCondition().comment).toEqual("some-comment");
    });
});

const csvData = `nome,preco,quantidade,estado,categoria,secao,departamento
Produto 1,100.00,1,some-comment,Categoria 1,Secao 1,Departamento 1
Produto 2,200.00,2,some-comment,Categoria 1,Secao 1,Departamento 1
Produto 3,300.00,3,some-comment,Categoria 1,Secao 1,Departamento 1
Produto 4,400.00,4,some-comment,Categoria 1,Secao 1,Departamento 1
Produto 5,500.00,5,some-comment,Categoria 1,Secao 1,Departamento 1`;
const category = Category.create("Categoria 1");
const section = new Section(ID.random(), "Secao 1", ID.random());
const invalidData = `name,price,isunique,quantity\nProduto 1,100.00,true,1\nProduto 2,,false,4`;
const incompleteFile = new File([invalidData], "filename.csv", { type: "text/csv" });
const file = new File([csvData], "filename.csv", { type: "text/csv" });
const fileHeader = new File(
    ["nome,preco,quantidade,estado,categoria,secao,departamento,invali_field"],
    "filename.csv",
    {
        type: "text/csv",
    }
);
const fileTxt = new File([], "filename.txt", { type: "text/plain" });
const emptyFile = new File(
    ["nome,preco,quantidade,estado,categoria,secao,departamento"],
    "filename.csv",
    {
        type: "text/csv",
    }
);
