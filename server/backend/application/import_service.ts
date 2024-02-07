import { SequenceGenerator } from "../domain/sequences/sequence_generator";
import { Item, ItemCondition, ItemStatus } from "../domain/catalog/item";
import { InvalidFileHeader } from "../domain/readers/invalid_file_header_error";
import { FileNotSupported } from "../domain/readers/file_not_supported_error";
import { SequencePrefix } from "../domain/sequences/sequence_prefix";
import { ItemRepository } from "../domain/catalog/item_repository";
import { CategoryRepository } from "../domain/catalog/category_repository";
import { CsvReader, validCsvHeader } from "../domain/readers/csv_reader";
import { FileEmpty } from "../domain/readers/file_empty_error";
import { Either, left, right } from "../shared/either";
import { Subcategory } from "../domain/catalog/subcategory";
import { Product } from "../domain/catalog/product";
import { ItemStock } from "../domain/catalog/item_stock";
import { Category } from "../domain/catalog/category";
import { UploadData } from "../shared/types";
import { FileError } from "../shared/errors";
import { ID } from "../shared/id";

export class ImportService {
    #categoryRepository: CategoryRepository;
    #itemRepository: ItemRepository;
    #generator: SequenceGenerator;

    constructor(
        categoryRepository: CategoryRepository,
        itemRepository: ItemRepository,
        generator: SequenceGenerator
    ) {
        this.#categoryRepository = categoryRepository;
        this.#itemRepository = itemRepository;
        this.#generator = generator;
    }

    async uploadItems(uploadData: UploadData): Promise<Either<FileError, void>> {
        const { categoryName, department, subcategoryName, file } = uploadData;

        if (!this.#isCsvFile(file)) {
            return Promise.resolve(left(new FileNotSupported()));
        }

        const reader = new CsvReader();
        const lines = await reader.read(file);
        const validFileOrError = this.#isValidFile(lines);
        if (validFileOrError.isLeft()) {
            return Promise.resolve(left(validFileOrError.value));
        }

        const categoryOrError = await this.#categoryRepository.findByName(categoryName);

        const subcategory = { subcategoryId: ID.RandomUUID(), name: subcategoryName };

        if (categoryOrError.isLeft()) {
            const category = Category.create({
                department,
                subcategory,
                name: categoryName,
            });

            await this.#categoryRepository.save(category);

            const items = this.#buildItems(lines, subcategory);

            await this.#itemRepository.saveAll(items);

            return Promise.resolve(right(undefined));
        }

        const category = categoryOrError.value;

        category.addSubcategory(subcategory);

        await this.#categoryRepository.update(category);

        const items = this.#buildItems(lines, subcategory);

        await this.#itemRepository.saveAll(items);

        return Promise.resolve(right(undefined));
    }

    #buildItems(lines: string[], subcategory: Subcategory): Item[] {
        const items: Item[] = [];
        lines.forEach((l, idx) => {
            if (idx === 0) return;

            const [name, price, isunique, quantity, comment] = l.split(",");

            if (!name || !price || !quantity || !isunique) return;

            const unique = Boolean(isunique);
            const product = Product.create({
                name,
                price,
                unique,
                subcategory,
            });

            const stock = new ItemStock(Number(quantity));
            const condition: ItemCondition = { status: ItemStatus.Good };
            if (comment) {
                condition.status = ItemStatus.Bad;
                condition.comment = comment;
            }

            const itemId = this.#generator.generate(SequencePrefix.Item);
            const item = Item.create({
                itemId,
                product,
                stock,
                condition,
            });

            items.push(item);
        });

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
