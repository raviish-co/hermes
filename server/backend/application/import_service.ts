import { InvalidFileHeader } from "../domain/readers/invalid_file_header_error";
import { FileNotSupported } from "../domain/readers/file_not_supported_error";
import { SequenceGenerator } from "../domain/sequences/sequence_generator";
import { CategoryRepository } from "../domain/catalog/category_repository";
import { Item, ItemCondition, ItemStatus } from "../domain/catalog/item";
import { CsvReader, validCsvHeader } from "../domain/readers/csv_reader";
import { ItemRepository } from "../domain/catalog/item_repository";
import { FileEmpty } from "../domain/readers/file_empty_error";
import { ItemStock } from "../domain/catalog/item_stock";
import { Sequence } from "../domain/sequences/sequence";
import { Either, left, right } from "../shared/either";
import { Category } from "../domain/catalog/category";
import { FileError } from "../shared/errors";

export class ImportService {
    #itemRepository: ItemRepository;
    #categoryRepository: CategoryRepository;
    #generator: SequenceGenerator;

    constructor(
        itemRepository: ItemRepository,
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

        for (let i = 1; i < lines.length; i++) {
            const [
                name,
                price,
                isunique,
                quantity,
                comment,
                categoryName,
                sectionName,
                departmentName,
            ] = lines[i].split(",");

            const categoryOrError = await this.#categoryRepository.findByName(categoryName);
            const section = { name: sectionName, department: departmentName };

            if (categoryOrError.isLeft()) {
                const category = Category.create(categoryName);
                const categoryId = category.categoryId;

                await this.#categoryRepository.save(category);

                const itemId = this.#generator.generate(Sequence.Item);

                const stock = new ItemStock(Number(quantity));

                const unique = isunique === "true" ? true : false;

                const condition: ItemCondition = { status: ItemStatus.Good };

                if (comment) {
                    condition.status = ItemStatus.Bad;
                    condition.comment = comment;
                }

                const item = Item.create({
                    itemId,
                    name,
                    price,
                    unique,
                    categoryId,
                    condition,
                    stock,
                    section,
                });

                items.push(item);
            }

            if (categoryOrError.isRight()) {
                const category = categoryOrError.value;
                const categoryId = category.categoryId;
                const itemId = this.#generator.generate(Sequence.Item);

                const stock = new ItemStock(Number(quantity));

                const unique = isunique === "true" ? true : false;

                const condition: ItemCondition = { status: ItemStatus.Good };

                if (comment) {
                    condition.status = ItemStatus.Bad;
                    condition.comment = comment;
                }

                const item = Item.create({
                    itemId,
                    name,
                    price,
                    unique,
                    categoryId,
                    condition,
                    stock,
                    section,
                });

                items.push(item);
            }
        }

        return items;
    }

    #isCsvFile(file: File): boolean {
        return file.type === "text/csv";
    }

    #isValidFile(lines: string[]): Either<FileError, void> {
        if (!validCsvHeader.includes(lines[0])) {
            return left(new InvalidFileHeader());
        }

        if (lines.length === 1) {
            return left(new FileEmpty());
        }

        return right(undefined);
    }
}
