import { InmemCategoryRepository } from "../../persistense/inmem/inmem_category_repository";
import { InmemSectionRepository } from "../../persistense/inmem/inmem_section_repository";
import { InmemSequenceStorage } from "../../persistense/inmem/inmem_sequence_storage";
import { InmemItemRepository } from "../../persistense/inmem/inmem_item_repository";
import { InvalidFileHeader } from "../../domain/readers/invalid_file_header_error";
import { FileNotSupported } from "../../domain/readers/file_not_supported_error";
import { SequenceGenerator } from "../../domain/sequences/sequence_generator";
import { FileEmpty } from "../../domain/readers/file_empty_error";
import { ImportService } from "../../application/import_service";
import { Category } from "../../domain/catalog/category";
import { ItemStatus } from "../../domain/catalog/item";
import { describe, it, expect } from "vitest";
import { ID } from "../../shared/id";
import { Section } from "../../domain/catalog/section";

describe("Test Upload Items", async () => {
    it("Deve retornar **FileNotSupported** caso o ficheiro não seja .csv", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const categoryRepoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const service = new ImportService(itemRepository, categoryRepoistory, sequenceGenerator);

        const error = await service.uploadItems(fileTxt);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(FileNotSupported);
    });

    it("Deve retornar **InvalidFileHeader** caso o cabeçalho não esteja completo", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const categoryRepoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const service = new ImportService(itemRepository, categoryRepoistory, sequenceGenerator);

        const error = await service.uploadItems(fileHeader);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidFileHeader);
    });

    it("Deve retonar **EmptyFile** caso o ficheiro seja válido e esteja vazio", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const categoryRepoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const service = new ImportService(itemRepository, categoryRepoistory, sequenceGenerator);

        const error = await service.uploadItems(emptyFile);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(FileEmpty);
    });

    it.skip("Deve retornar um erro caso haja um campo vazio no ficheiro", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const categoryRepoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const service = new ImportService(itemRepository, categoryRepoistory, sequenceGenerator);

        const file = new File([incompleteFile], "filename.csv", {
            type: "text/csv",
        });

        const error = await service.uploadItems(file);

        expect(error.isLeft()).toBeTruthy();
    });

    it("Deve carregar os artigos a partir do ficheiro .csv", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const categoryRepoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const service = new ImportService(itemRepository, categoryRepoistory, sequenceGenerator);

        await service.uploadItems(file);

        const { result: items } = await itemRepository.list(1, 12);

        expect(items.length).toBe(5);
    });

    it("Deve criar uma categoria caso ela não exista", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const categoryRepoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const service = new ImportService(itemRepository, categoryRepoistory, sequenceGenerator);

        await service.uploadItems(file);

        const categoryOrError = await categoryRepoistory.findByName("Categoria 1");
        const category = <Category>categoryOrError.value;

        expect(category.name).toEqual("Categoria 1");
    });

    it("Deve associar o ID da categoria ao artigo a ser importado", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const categoryRepoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const service = new ImportService(itemRepository, categoryRepoistory, sequenceGenerator);

        await service.uploadItems(file);

        const { result: items } = await itemRepository.list(1, 12);

        const item = items[0];
        const item1 = items[1];

        expect(item.categoryId).toBeDefined();
        expect(item1.categoryId).toBeDefined();
        expect(item.categoryId.toString()).toEqual(item1.categoryId.toString());
    });

    it("Deve criar a seção caso ela não exista", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const categoryRepoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const service = new ImportService(itemRepository, categoryRepoistory, sequenceGenerator);

        await service.uploadItems(file);

        const item = await itemRepository.last();

        expect(item.section).toBeDefined();
        expect(item.section?.name).toEqual("Secao 1");
        expect(item.section?.department).toEqual("Departamento 1");
    });

    it("Deve gerar o ID para os items ao serem carragados na base de dados", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const repoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const service = new ImportService(itemRepository, repoistory, sequenceGenerator);

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
        const service = new ImportService(itemRepository, categoryRepository, sequenceGenerator);

        await service.uploadItems(file);

        const { result: items } = await itemRepository.list(1, 12);

        expect(items[0].getCondition().status).toEqual(ItemStatus.Bad);
        expect(items[0].getCondition().comment).toEqual("some-comment");
        expect(items[1].getCondition().status).toEqual(ItemStatus.Bad);
        expect(items[1].getCondition().comment).toEqual("some-comment");
    });
});

const csvData = `nome,preco,unico,quantidade,estado,categoria,secao,departamento
Produto 1,100.00,true,1,some-comment,Categoria 1,Secao 1,Departamento 1
Produto 2,200.00,false,2,some-comment,Categoria 1,Secao 1,Departamento 1
Produto 3,300.00,false,3,some-comment,Categoria 1,Secao 1,Departamento 1
Produto 4,400.00,false,4,some-comment,Categoria 1,Secao 1,Departamento 1
Produto 5,500.00,false,5,some-comment,Categoria 1,Secao 1,Departamento 1`;

const invalidData = `name,price,isunique,quantity\nProduto 1,100.00,true,1\nProduto 2,,false,4`;
const incompleteFile = new File([invalidData], "filename.csv", { type: "text/csv" });
const file = new File([csvData], "filename.csv", { type: "text/csv" });
const fileHeader = new File(
    ["nome,preco,unico,quantidade,estado,categoria,secao,departamento,invali_field"],
    "filename.csv",
    {
        type: "text/csv",
    }
);
const fileTxt = new File([], "filename.txt", { type: "text/plain" });
const emptyFile = new File(
    ["nome,preco,unico,quantidade,estado,categoria,secao,departamento"],
    "filename.csv",
    {
        type: "text/csv",
    }
);

// it("Deve criar uma categoria caso ela não exista", async () => {
//     const storage = new InmemSequenceStorage();
//     const sequenceGenerator = new SequenceGenerator(storage);
//     const repoistory = new InmemCategoryRepository();
//     const itemRepository = new InmemItemRepository();
//     const service = new ImportService(repoistory, itemRepository, sequenceGenerator);
//     await service.uploadItems(data);
//     const categoryOrError = await repoistory.findByName("Categoria 1");
//     const category = <Category>categoryOrError.value;
//     expect(category.name).toEqual(data.categoryName);
//     expect(category.department).toEqual(data.department);
// });
// it("Deve criar a subcategoria da categoria caso ela não exista", async () => {
//     const storage = new InmemSequenceStorage();
//     const sequenceGenerator = new SequenceGenerator(storage);
//     const repoistory = new InmemCategoryRepository();
//     const itemRepository = new InmemItemRepository();
//     const service = new ImportService(repoistory, itemRepository, sequenceGenerator);
//     await service.uploadItems(data);
//     const categoryOrError = await repoistory.findByName("Categoria 1");
//     const category = <Category>categoryOrError.value;
//     expect(category.subcategories.length).toEqual(1);
//     expect(category.subcategories[0].name).toEqual(data.subcategoryName);
// });
// it("Deve adicionar uma subcategoria a categoria existente", async () => {
//     const subcategoryName = "Subcategoria 2";
//     const storage = new InmemSequenceStorage();
//     const sequenceGenerator = new SequenceGenerator(storage);
//     const repoistory = new InmemCategoryRepository();
//     const itemRepository = new InmemItemRepository();
//     await repoistory.save(category);
//     const service = new ImportService(repoistory, itemRepository, sequenceGenerator);
//     await service.uploadItems({ ...data, subcategoryName });
//     const categoryOrError = await repoistory.findByName("Categoria 1");
//     const categoryResult = <Category>categoryOrError.value;
//     expect(categoryResult.subcategories.length).toEqual(2);
//     expect(categoryResult.subcategories[1].name).toEqual(subcategoryName);
// });
// it("Deve carregar os artigos apartir do ficheiro .csv", async () => {
//     const data = {
//         department: "Departamento 1",
//         categoryName: "Categoria 1",
//         subcategoryName: "Subcategoria 1",
//         file,
//     };
//     const storage = new InmemSequenceStorage();
//     const sequenceGenerator = new SequenceGenerator(storage);
//     const repoistory = new InmemCategoryRepository();
//     const itemRepository = new InmemItemRepository();
//     const service = new ImportService(repoistory, itemRepository, sequenceGenerator);
//     await service.uploadItems(data);
//     const { result: items } = await itemRepository.list(1, 12);
//     expect(items.length).toEqual(5);
//     expect(items[0].product.name).toEqual("Produto 1");
// });
// it("Deve associar a subcategoria aos artigos a serem importados", async () => {
//     const storage = new InmemSequenceStorage();
//     const sequenceGenerator = new SequenceGenerator(storage);
//     const repoistory = new InmemCategoryRepository();
//     const itemRepository = new InmemItemRepository();
//     const service = new ImportService(repoistory, itemRepository, sequenceGenerator);
//     await service.uploadItems(data);
//     const item = await itemRepository.last();
//     expect(item.product.subcategory.subcategoryId).toBeDefined();
//     expect(item.product.subcategory.name).toEqual("Subcategoria 1");
// });

// it("Deve salvar os artigos com subcategoria existente na base de dados", async () => {
//     const storage = new InmemSequenceStorage();
//     const sequenceGenerator = new SequenceGenerator(storage);
//     const repoistory = new InmemCategoryRepository();
//     const itemRepository = new InmemItemRepository();
//     await repoistory.save(category);
//     const service = new ImportService(repoistory, itemRepository, sequenceGenerator);
//     await service.uploadItems(data);
//     const { result: items } = await itemRepository.list(1, 12);
//     expect(items.length).toEqual(5);
//     expect(items[0].product.name).toEqual("Produto 1");
//     expect(items[0].product.subcategory.subcategoryId).toBeDefined();
//     expect(items[0].product.subcategory.name).toEqual("Subcategoria 1");
// });
