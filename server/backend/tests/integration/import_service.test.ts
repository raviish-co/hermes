import { describe, it, expect } from "vitest";
import { ID } from "../../shared/id";
import { InmemItemRepository } from "../../persistense/inmem/inmem_item_repository";
import { ItemStatus } from "../../domain/catalog/item";
import { SequenceGenerator } from "../../domain/sequences/sequence_generator";
import { InmemSequenceStorage } from "../../persistense/inmem/inmem_sequence_storage";
import { Category } from "../../domain/catalog/category";
import { InmemCategoryRepository } from "../../persistense/inmem/inmem_category_repository";
import { ImportService } from "../../application/import_service";
import { FileNotSupported } from "../../domain/readers/file_not_supported_error";
import { FileEmpty } from "../../domain/readers/file_empty_error";
import { InvalidFileHeader } from "../../domain/readers/invalid_file_header_error";

describe("Test Import Service", async () => {
    it("Deve criar uma categoria caso ela não exista", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const repoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const service = new ImportService(repoistory, itemRepository, sequenceGenerator);

        await service.uploadItems(data);

        const categoryOrError = await repoistory.findByName("Categoria 1");
        const category = <Category>categoryOrError.value;

        expect(category.name).toEqual(data.categoryName);
        expect(category.department).toEqual(data.department);
    });

    it("Deve criar a subcategoria da categoria caso ela não exista", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const repoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const service = new ImportService(repoistory, itemRepository, sequenceGenerator);
        await service.uploadItems(data);

        const categoryOrError = await repoistory.findByName("Categoria 1");
        const category = <Category>categoryOrError.value;

        expect(category.subcategories.length).toEqual(1);
        expect(category.subcategories[0].name).toEqual(data.subcategoryName);
    });

    it("Deve adicionar uma subcategoria a categoria existente", async () => {
        const subcategoryName = "Subcategoria 2";
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const repoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        await repoistory.save(category);
        const service = new ImportService(repoistory, itemRepository, sequenceGenerator);

        await service.uploadItems({ ...data, subcategoryName });

        const categoryOrError = await repoistory.findByName("Categoria 1");
        const categoryResult = <Category>categoryOrError.value;

        expect(categoryResult.subcategories.length).toEqual(2);
        expect(categoryResult.subcategories[1].name).toEqual(subcategoryName);
    });

    it("Deve carregar os artigos apartir do ficheiro .csv", async () => {
        const data = {
            department: "Departamento 1",
            categoryName: "Categoria 1",
            subcategoryName: "Subcategoria 1",
            file,
        };
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const repoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const service = new ImportService(repoistory, itemRepository, sequenceGenerator);

        await service.uploadItems(data);

        const { result: items } = await itemRepository.list(1, 12);

        expect(items.length).toEqual(5);
        expect(items[0].product.name).toEqual("Produto 1");
    });

    it("Deve associar a subcategoria aos artigos a serem importados", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const repoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const service = new ImportService(repoistory, itemRepository, sequenceGenerator);

        await service.uploadItems(data);

        const item = await itemRepository.last();

        expect(item.product.subcategory.subcategoryId).toBeDefined();
        expect(item.product.subcategory.name).toEqual("Subcategoria 1");
    });

    it("Deve gerar o ID para os items ao serem carragados na base de dados", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const repoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const service = new ImportService(repoistory, itemRepository, sequenceGenerator);

        await service.uploadItems(data);

        const { result: items } = await itemRepository.list(1, 12);

        expect(items.length).toEqual(5);
        expect(items[0].itemId.toString()).toEqual("RVS - 0001");
        expect(items[1].itemId.toString()).toEqual("RVS - 0002");
        expect(items[2].itemId.toString()).toEqual("RVS - 0003");
        expect(items[3].itemId.toString()).toEqual("RVS - 0004");
        expect(items[4].itemId.toString()).toEqual("RVS - 0005");
    });

    it("Deve salvar os artigos com subcategoria existente na base de dados", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const repoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        await repoistory.save(category);
        const service = new ImportService(repoistory, itemRepository, sequenceGenerator);

        await service.uploadItems(data);

        const { result: items } = await itemRepository.list(1, 12);

        expect(items.length).toEqual(5);
        expect(items[0].product.name).toEqual("Produto 1");
        expect(items[0].product.subcategory.subcategoryId).toBeDefined();
        expect(items[0].product.subcategory.name).toEqual("Subcategoria 1");
    });

    it("Deve retornar um erro caso o cabeçalho do fichero não seja válido", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const repoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const service = new ImportService(repoistory, itemRepository, sequenceGenerator);
        const file = new File(["name,price,isunique,quantity,invalid_field"], "filename.csv", {
            type: "text/csv",
        });
        const data = {
            department: "Departamento 1",
            categoryName: "Categoria 1",
            subcategoryName: "Subcategoria 1",
            file,
        };

        const error = await service.uploadItems(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidFileHeader);
    });

    it("Deve retonar um erro caso o ficheiro seja válido e esteja vazio", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const repoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const service = new ImportService(repoistory, itemRepository, sequenceGenerator);
        const file = new File(["name,price,isunique,quantity"], "filename.csv", {
            type: "text/csv",
        });
        const data = {
            department: "Departamento 1",
            categoryName: "Categoria 1",
            subcategoryName: "Subcategoria 1",
            file,
        };

        const error = await service.uploadItems(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(FileEmpty);
    });

    it("Deve retornar um erro caso haja um campo vazio no ficheiro", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const repoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const service = new ImportService(repoistory, itemRepository, sequenceGenerator);
        const file = new File([incompleteFile], "filename.csv", {
            type: "text/csv",
        });
        const data = {
            department: "Departamento 1",
            categoryName: "Categoria 1",
            subcategoryName: "Subcategoria 1",
            file,
        };

        await service.uploadItems(data);

        const { result: items } = await itemRepository.list(1, 12);

        expect(items.length).toEqual(1);
    });

    it("Deve retornar **FileNotSupported** caso o ficheiro não seja .csv", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const repoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const service = new ImportService(repoistory, itemRepository, sequenceGenerator);
        const file = new File(["name,price,isunique,quantity"], "filename.txt", {
            type: "text/plain",
        });
        const data = {
            department: "Departamento 1",
            categoryName: "Categoria 1",
            subcategoryName: "Subcategoria 1",
            file,
        };

        const error = await service.uploadItems(data);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(FileNotSupported);
    });

    it("Deve adicionar o comentario ao estado do item caso seja definido", async () => {
        const storage = new InmemSequenceStorage();
        const sequenceGenerator = new SequenceGenerator(storage);
        const repoistory = new InmemCategoryRepository();
        const itemRepository = new InmemItemRepository();
        const service = new ImportService(repoistory, itemRepository, sequenceGenerator);
        const file = new File([csvData], "filename.csv", { type: "text/csv" });
        const data = {
            department: "Departamento 1",
            categoryName: "Categoria 1",
            subcategoryName: "Subcategoria 1",
            file,
        };

        await service.uploadItems(data);

        const { result: items } = await itemRepository.list(1, 12);

        expect(items[0].getCondition().status).toEqual(ItemStatus.Bad);
        expect(items[0].getCondition().comment).toEqual("some-comment");
        expect(items[1].getCondition().status).toEqual(ItemStatus.Good);
        expect(items[1].getCondition().comment).toBeUndefined();
    });
});

const csvData = `name,price,isunique,quantity,comment
Produto 1,100.00,true,1,some-comment
Produto 2,200.00,false,2,
Produto 3,300.00,false,3,some-comment
Produto 4,400.00,false,4,
Produto 5,500.00,false,5,`;

const invalidData = `name,price,isunique,quantity\nProduto 1,100.00,true,1\nProduto 2,,false,4`;
const incompleteFile = new File([invalidData], "filename.csv", { type: "text/csv" });
const file = new File([csvData], "filename.csv", { type: "text/csv" });
const subcategory = { subcategoryId: ID.RandomUUID(), name: "Subcategoria 1" };
const category = Category.create({
    name: "Categoria 1",
    subcategory,
    department: "Departamento 1",
});

const data = {
    department: "Departamento 1",
    categoryName: "Categoria 1",
    subcategoryName: "Subcategoria 1",
    file,
};
