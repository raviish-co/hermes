import {
    ItemCategory,
    type ItemCondition,
    ItemStatus,
} from "@backend/domain/catalog/item_category";
import type { ItemCategoryRepository } from "@backend/domain/catalog/item_category_repository";
import type { CategoryRepository } from "@backend/domain/catalog/category_repository";
import { InvalidFileHeader } from "@backend/domain/readers/invalid_file_header_error";
import { FileNotSupported } from "@backend/domain/readers/file_not_supported_error";
import { CsvReader, VALID_CSV_HEADER } from "@backend/domain/readers/csv_reader";
import { SequenceGenerator } from "@backend/domain/sequences/sequence_generator";
import { ItemCategoryStock } from "@backend/domain/catalog/item_category_stock";
import { FileEmpty } from "@backend/domain/readers/file_empty_error";
import { left, right, type Either } from "@backend/shared/either";
import { Sequence } from "@backend/domain/sequences/sequence";
import { Category } from "@backend/domain/catalog/category";
import type { FileError } from "@backend/shared/errors";

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

    async #buildItems(lines: string[]): Promise<ItemCategory[]> {
        const items: ItemCategory[] = [];

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

                const stock = new ItemCategoryStock(Number(quantity));

                const unique = isunique === "true" ? true : false;

                const condition: ItemCondition = { status: ItemStatus.Good };

                if (comment) {
                    condition.status = ItemStatus.Bad;
                    condition.comment = comment;
                }

                const item = ItemCategory.create({
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

                const stock = new ItemCategoryStock(Number(quantity));

                const unique = isunique === "true" ? true : false;

                const condition: ItemCondition = { status: ItemStatus.Good };

                if (comment) {
                    condition.status = ItemStatus.Bad;
                    condition.comment = comment;
                }

                const item = ItemCategory.create({
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
        if (!VALID_CSV_HEADER.includes(lines[0])) {
            return left(new InvalidFileHeader());
        }

        if (lines.length === 1) {
            return left(new FileEmpty());
        }

        return right(undefined);
    }
}
