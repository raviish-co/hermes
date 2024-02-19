import { Item, type Condition, Status, ItemBuilder } from "../domain/catalog/item";
import type { ItemCategoryRepository } from "../domain/catalog/item_repository";
import type { CategoryRepository } from "../domain/catalog/category_repository";
import { InvalidFileHeader } from "../domain/readers/invalid_file_header_error";
import { FileNotSupported } from "../domain/readers/file_not_supported_error";
import { CsvReader, VALID_CSV_HEADER } from "../domain/readers/csv_reader";
import { SequenceGenerator } from "../domain/sequences/sequence_generator";
import { ItemStock } from "../domain/catalog/item_stock";
import { FileEmpty } from "../domain/readers/file_empty_error";
import { left, right, type Either } from "../shared/either";
import { Sequence } from "../domain/sequences/sequence";
import { Category } from "../domain/catalog/category";
import type { FileError } from "../shared/errors";
import { ID } from "../shared/id";
import { Decimal } from "../shared/decimal";

export class ImportService {
    #itemRepository: ItemCategoryRepository;
    #categoryRepository: CategoryRepository;
    #generator: SequenceGenerator;

    constructor(
        itemRepository: ItemCategoryRepository,
        categoryRepository: CategoryRepository,
        generator: SequenceGenerator
    ) {
        this.#categoryRepository = categoryRepository;
        this.#itemRepository = itemRepository;
        this.#generator = generator;
    }

    async uploadItems(file: File): Promise<Either<FileError, void>> {
        if (!this.#isCsvFile(file)) return Promise.resolve(left(new FileNotSupported()));

        const csvReader = new CsvReader();
        const lines = await csvReader.read(file);

        const validOrError = this.#isValidFile(lines);
        if (validOrError.isLeft()) return Promise.resolve(left(validOrError.value));

        const items = await this.#buildItems(lines);

        await this.#itemRepository.saveAll(items);

        return Promise.resolve(right(undefined));
    }

    async #buildItems(lines: string[]): Promise<Item[]> {
        const items: Item[] = [];

        for (const line of lines) {
            const item = await this.#parseLine(line);
            items.push(item);
        }

        return items;
    }

    async #parseLine(line: string): Promise<Item> {
        const [name, price, quantity, comment, categoryName, sectionName] = line.split(",");

        const categoryOrError = await this.#categoryRepository.findByName(categoryName);
        const sectionId: string | undefined = undefined;
        // Procurar a seção pelo nome

        //A mesma coisa com as variacoes

        if (categoryOrError.isLeft()) {
            // const category = Category.create(categoryName);
            // const categoryId = category.categoryId;

            // await this.#categoryRepository.save(category);
            throw new Error("Category not found");
        }

        const itemId = this.#generator.generate(Sequence.Item);

        const stock = new ItemStock(Number(quantity));

        const condition: Condition = { status: Status.Good };

        if (comment) {
            condition.status = Status.Bad;
            condition.comment = comment;
        }

        const itemOrErr = new ItemBuilder()
            .withItemId(ID.fromString(itemId))
            .withName(name)
            .withPrice(Decimal.fromString(price))
            .withCategoryId(categoryOrError.value.categoryId)
            .withCondition(condition)
            .withStock(Number(stock))
            .withSectionId(ID.fromString(sectionId!))
            .build();

        if (itemOrErr.isLeft()) {
            throw new Error("Error creating item");
        }

        return itemOrErr.value;
    }

    #isCsvFile(file: File): boolean {
        return file.type === "text/csv";
    }

    #isValidFile(lines: string[]): Either<FileError, void> {
        if (!VALID_CSV_HEADER.includes(lines[0])) {
            return left(new InvalidFileHeader());
        }

        if (lines.length === 1) {
            return left(new FileEmpty());
        }

        return right(undefined);
    }
}
