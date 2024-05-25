import { describe, expect, it } from "vitest";
import { CsvReader } from "../../adapters/readers/csv_reader";
import { FileEmpty } from "../../adapters/readers/file_empty_error";
import { FileNotSupported } from "../../adapters/readers/file_not_supported_error";
import { InvalidFileHeader } from "../../adapters/readers/invalid_file_header_error";
import { SequenceGenerator } from "../../adapters/sequences/sequence_generator";
import { ImportService } from "../../application/import_service";
import { Category } from "../../domain/catalog/categories/category";
import { CategoryNotFound } from "../../domain/catalog/categories/category_not_found_error";
import type { CategoryRepository } from "../../domain/catalog/categories/category_repository";
import { Section } from "../../domain/catalog/departments/section";
import { SectionNotFound } from "../../domain/catalog/departments/section_not_found_error";
import type { SectionRepository } from "../../domain/catalog/departments/section_repository";
import { VariationNotFound } from "../../domain/catalog/variations/variation_not_found_error";
import type { VariationRepository } from "../../domain/catalog/variations/variation_repository";
import { InmemCategoryRepository } from "../../persistense/inmem/inmem_category_repository";
import { InmemItemRepository } from "../../persistense/inmem/inmem_item_repository";
import { InmemSectionRepository } from "../../persistense/inmem/inmem_section_repository";
import { InmemSequenceStorage } from "../../persistense/inmem/inmem_sequence_storage";
import { InmemVariationRepository } from "../../persistense/inmem/inmem_variation_repository";
import { ID } from "../../shared/id";
import { ItemStockRepositoryStub } from "../stubs/item_stock_repository_stub";
import { VariationRepositoryStub } from "../stubs/variation_repository_stub";
import { InmemGoodsReceiptNoteRepository } from "../../persistense/inmem/inmem_goods_receipt_note_repository";

describe("Test Upload Items", async () => {
    it("Deve retornar **FileNotSupported** caso o ficheiro não seja .csv", async () => {
        const { service } = makeService();

        const error = await service.uploadItems(fileTxt);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(FileNotSupported);
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
});

describe("Import Service - Upload Items in Stock", async () => {
    it("Deve actualizar as quantidades em stock dos artigos a partir do ficheiro .csv", async () => {
        const { service, itemStockRepository } = makeService();
        const file = new File([itemsStockData], "filename.csv", { type: "text/csv" });

        await service.uploadItemsInStock(file);

        const itemsStock = await itemStockRepository.findAll([
            ID.fromString("1001"),
            ID.fromString("1002"),
            ID.fromString("1003"),
        ]);

        expect(itemsStock.length).toBe(3);
        expect(itemsStock[0].goodQuantities).toBe(20);
        expect(itemsStock[1].goodQuantities).toBe(18);
        expect(itemsStock[2].goodQuantities).toBe(12);
    });

    it("Deve actualizar as quantidades em mau estado dos artigos em stock a partir do ficheiro .csv", async () => {
        const { service, itemStockRepository } = makeService();
        const file = new File([itemsStockData], "filename.csv", { type: "text/csv" });

        await service.uploadItemsInStock(file);

        const itemsStock = await itemStockRepository.findAll([
            ID.fromString("1001"),
            ID.fromString("1002"),
            ID.fromString("1003"),
        ]);

        expect(itemsStock.length).toBe(3);

        expect(itemsStock[0].badQuantities).toBe(5);
        expect(itemsStock[1].badQuantities).toBe(5);
        expect(itemsStock[2].badQuantities).toBe(10);
    });

    it("Deve criar a guia de entrada de mercadorias em stock", async () => {
        const { service, goodsReceiptNoteRepository } = makeService();
        const file = new File([itemsStockData], "filename.csv", { type: "text/csv" });

        await service.uploadItemsInStock(file);

        const note = await goodsReceiptNoteRepository.last();

        expect(note.noteId.toString()).toBe("GE - 0001");
        expect(note.lines.length).toBe(3);
    });

    it("Deve retornar **FileNotSupported** caso o ficheiro não seja .csv", async () => {
        const { service } = makeService();

        const error = await service.uploadItemsInStock(fileTxt);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(FileNotSupported);
    });

    it("Deve retornar **EmptyFile** caso o ficheiro seja válido e esteja vazio", async () => {
        const { service } = makeService();

        const error = await service.uploadItemsInStock(emptyFile);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(FileEmpty);
    });

    it("Deve retornar **InvalidFileHeader** caso o cabeçalho não esteja completo", async () => {
        const { service } = makeService();
        const data = `id,nome,description
        1001,10,5`;
        const file = new File([data], "filename.csv", { type: "text/csv" });

        const error = await service.uploadItemsInStock(file);

        expect(error.isLeft()).toBeTruthy();
        expect(error.value).toBeInstanceOf(InvalidFileHeader);
    });
});

const category = new Category(ID.random(), "Categoria 1");
const section = new Section(ID.random(), "Secao 1", ID.random());

const csvData = `nome,preco,categoria,seccao,cor,marca
Produto 1,100.00,Categoria 1,Secao 1,Preto,Nike
Produto 2,200.00,Categoria 1,Secao 1,Preto,Rebock
Produto 3,300.00,Categoria 1,Secao 1,Preto,Adidas
Produto 4,400.00,Categoria 1,Secao 1,Preto,Nike
Produto 5,500.00,Categoria 1,Secao 1,Preto,Rebock`;

const variationFormatData = `nome,preco,estado,categoria,seccao,variacoes
Produto 1,100.00,1,some-comment,Categoria 1,Secao 1,Cor-Preto`;

const file = new File([csvData], "filename.csv", { type: "text/csv" });

const fileHeader = new File(["nome,invali_field"], "filename.csv", {
    type: "text/csv",
});
const fileTxt = new File([], "filename.txt", { type: "text/plain" });
const emptyFile = new File(["nome,preco,estado,categoria,seccao,variacoes"], "filename.csv", {
    type: "text/csv",
});

const itemsStockData = `id,boas,com_defeito 
1001,10,5
1002,8,5
1003,5,10`;

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
    const itemStockRepository = new ItemStockRepositoryStub();
    const goodsReceiptNoteRepository = new InmemGoodsReceiptNoteRepository();
    const csvReader = new CsvReader();

    const service = new ImportService(
        itemRepository,
        itemStockRepository,
        categoryRepository,
        sectionRepository,
        variationRepository,
        goodsReceiptNoteRepository,
        sequenceGenerator,
        csvReader
    );

    return {
        service,
        itemRepository,
        categoryRepository,
        sectionRepository,
        variationRepository,
        itemStockRepository,
        goodsReceiptNoteRepository,
    };
}
