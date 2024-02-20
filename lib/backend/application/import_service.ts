import type { CategoryRepository } from "../domain/catalog/category_repository";
import { InvalidFileHeader } from "../domain/readers/invalid_file_header_error";
import { FileNotSupported } from "../domain/readers/file_not_supported_error";
import type { SectionRepository } from "../domain/catalog/section_repository";
import { CsvReader, VALID_CSV_HEADER } from "../domain/readers/csv_reader";
import { SequenceGenerator } from "../domain/sequences/sequence_generator";
import type { ItemRepository } from "../domain/catalog/item_repository";
import { Item, type Condition, Status } from "../domain/catalog/item";
import { FileEmpty } from "../domain/readers/file_empty_error";
import { ItemBuilder } from "../domain/catalog/item_builder";
import { left, right, type Either } from "../shared/either";
import { Sequence } from "../domain/sequences/sequence";
import type { FileError } from "../shared/errors";
import { Decimal } from "../shared/decimal";
import { ID } from "../shared/id";

export class ImportService {
    #itemRepository: ItemRepository;
    #categoryRepository: CategoryRepository;
    #sectionRepository: SectionRepository;
    #generator: SequenceGenerator;

    constructor(
        itemRepository: ItemRepository,
        categoryRepository: CategoryRepository,
        sectionRepository: SectionRepository,
        generator: SequenceGenerator
    ) {
        this.#categoryRepository = categoryRepository;
        this.#itemRepository = itemRepository;
        this.#sectionRepository = sectionRepository;
        this.#generator = generator;
    }

    async uploadItems(file: File): Promise<Either<FileError, void>> {
        if (!this.#isCsvFile(file)) return Promise.resolve(left(new FileNotSupported()));

        const csvReader = new CsvReader();
        const lines = await csvReader.read(file);

        const validOrError = this.#isValidFile(lines);
        if (validOrError.isLeft()) return Promise.resolve(left(validOrError.value));

        const itemsOrError = await this.#buildItems(lines);
        if (itemsOrError.isLeft()) return left(itemsOrError.value);

        await this.#itemRepository.saveAll(itemsOrError.value);

        return Promise.resolve(right(undefined));
    }

    async #buildItems(lines: string[]): Promise<Either<Error, Item[]>> {
        const items: Item[] = [];

        for (const line of lines.slice(1)) {
            const itemOrError = await this.#parseLine(line);
            if (itemOrError.isLeft()) return left(itemOrError.value);
            items.push(itemOrError.value);
        }

        return right(items);
    }

    async #parseLine(line: string): Promise<Either<Error, Item>> {
        const [name, price, quantity, comment, categoryName, sectionName] = line.split(",");
        const categoryOrError = await this.#categoryRepository.findByName(categoryName);
        const sectionOrError = await this.#sectionRepository.findByName(sectionName);

        if (categoryOrError.isLeft()) return left(categoryOrError.value);

        if (sectionOrError.isLeft()) return left(sectionOrError.value);

        // A mesma coisa com as variacoes

        const itemId = this.#generator.generate(Sequence.Item);
        const condition: Condition = { status: Status.Good };

        if (comment) {
            condition.status = Status.Bad;
            condition.comment = comment;
        }

        const categoryId = categoryOrError.value.categoryId;
        const sectionId = sectionOrError.value.sectionId;

        const itemOrError = new ItemBuilder()
            .withItemId(ID.fromString(itemId))
            .withName(name)
            .withPrice(Decimal.fromString(price))
            .withCategoryId(categoryId)
            .withCondition(condition)
            .withStock(Number(quantity))
            .withSectionId(sectionId)
            .build();

        if (itemOrError.isLeft()) return left(itemOrError.value);

        return right(itemOrError.value);
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
