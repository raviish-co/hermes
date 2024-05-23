import { VALID_ITEM_CSV_HEADER, VALID_ITEM_STOCK_CSV_HEADER } from "../adapters/readers/csv_reader";
import { FileEmpty } from "../adapters/readers/file_empty_error";
import { FileNotSupported } from "../adapters/readers/file_not_supported_error";
import { InvalidFileHeader } from "../adapters/readers/invalid_file_header_error";
import type { Reader } from "../adapters/readers/reader";
import type { Generator } from "../adapters/sequences/generator";
import { Sequence } from "../adapters/sequences/sequence";
import type { CategoryRepository } from "../domain/catalog/categories/category_repository";
import type { SectionRepository } from "../domain/catalog/departments/section_repository";
import { Item } from "../domain/catalog/items/item";
import { ItemBuilder } from "../domain/catalog/items/item_builder";
import type { ItemRepository } from "../domain/catalog/items/item_repository";
import { InvalidVariationFormat } from "../domain/catalog/variations/invalid_variation_format_error";
import type { Variation } from "../domain/catalog/variations/variation";
import type { VariationRepository } from "../domain/catalog/variations/variation_repository";
import type { ItemStock } from "../domain/warehouse/item_stock";
import type { ItemStockRepository } from "../domain/warehouse/item_stock_repository";
import { Decimal } from "../shared/decimal";
import { left, right, type Either } from "../shared/either";
import type { FileError } from "../shared/errors";
import { ID } from "../shared/id";

export class ImportService {
    #itemRepository: ItemRepository;
    #itemStockRepository: ItemStockRepository;
    #categoryRepository: CategoryRepository;
    #sectionRepository: SectionRepository;
    #variationRepository: VariationRepository;
    #generator: Generator;
    #reader: Reader;

    constructor(
        itemRepository: ItemRepository,
        itemStockRepository: ItemStockRepository,
        categoryRepository: CategoryRepository,
        sectionRepository: SectionRepository,
        variationRepository: VariationRepository,
        generator: Generator,
        reader: Reader
    ) {
        this.#itemRepository = itemRepository;
        this.#itemStockRepository = itemStockRepository;
        this.#categoryRepository = categoryRepository;
        this.#sectionRepository = sectionRepository;
        this.#variationRepository = variationRepository;
        this.#generator = generator;
        this.#reader = reader;
    }

    async uploadItems(file: File): Promise<Either<FileError, void>> {
        if (!this.#isCsvFile(file)) return left(new FileNotSupported());
        const lines = await this.#reader.read(file);

        const validOrErr = this.#isValidFile(lines);
        if (validOrErr.isLeft()) return left(validOrErr.value);

        const itemsOrErr = await this.#buildItems(lines);
        if (itemsOrErr.isLeft()) return left(itemsOrErr.value);

        await this.#itemRepository.saveAll(itemsOrErr.value);

        return right(undefined);
    }

    async uploadItemsInStock(file: File): Promise<Either<FileError, void>> {
        if (!this.#isCsvFile(file)) return left(new FileNotSupported());

        const lines = await this.#reader.read(file);
        if (lines.length <= 1) return left(new FileEmpty());

        if (!VALID_ITEM_STOCK_CSV_HEADER.includes(lines[0].trim())) {
            return left(new InvalidFileHeader());
        }

        const itemsIds = this.#buildItemsIds(lines);

        const itemsStock = await this.#itemStockRepository.findAll(itemsIds);

        this.#increaseItemsStock(itemsStock, lines);

        this.#itemStockRepository.updateAll(itemsStock);

        return right(undefined);
    }

    async #buildItems(lines: string[]): Promise<Either<Error, Item[]>> {
        const items: Item[] = [];

        for (const line of lines.slice(1)) {
            const itemOrErr = await this.#parseLine(line);
            if (itemOrErr.isLeft()) return left(itemOrErr.value);

            items.push(itemOrErr.value);
        }

        return right(items);
    }

    #buildItemsIds(lines: string[]) {
        const itemsIds: ID[] = [];

        lines.slice(1).forEach((line) => {
            const [itemId, _] = line.split(",");
            itemsIds.push(ID.fromString(itemId));
        });

        return itemsIds;
    }

    async #parseLine(line: string): Promise<Either<Error, Item>> {
        const [name, price, _, categoryName, sectionName, variationsTokens] = line.split(",");

        const resultOrErr = this.#extractVariations(variationsTokens);
        if (resultOrErr.isLeft()) return left(resultOrErr.value);

        const categoryOrErr = await this.#categoryRepository.findByName(categoryName);
        if (categoryOrErr.isLeft()) return left(categoryOrErr.value);

        const sectionOrErr = await this.#sectionRepository.findByName(sectionName);
        if (sectionOrErr.isLeft()) return left(sectionOrErr.value);

        const variationsOrErr = await this.#variationRepository.findByNames(
            resultOrErr.value.names
        );
        if (variationsOrErr.isLeft()) return left(variationsOrErr.value);

        const variations = this.#makeItemVariationsValues(
            variationsOrErr.value,
            resultOrErr.value.values
        );
        const categoryId = categoryOrErr.value.categoryId.toString();
        const itemId = this.#generator.generate(Sequence.Item);
        const itemOrErr = new ItemBuilder()
            .withItemId(itemId)
            .withName(name)
            .withPrice(new Decimal(Number(price)))
            .withCategoryId(categoryId)
            .withSectionId(sectionOrErr.value.sectionId.toString())
            .withVariationsValues(variations)
            .build();

        if (itemOrErr.isLeft()) return left(itemOrErr.value);

        return right(itemOrErr.value);
    }

    #makeItemVariationsValues(variations: Variation[], values: string[]): Record<string, string> {
        const result: Record<string, string> = {};
        for (const variation of variations) {
            const value = values[variations.indexOf(variation)];
            result[variation.variationId.toString()] = variation.name + ": " + value;
        }
        return result;
    }

    #extractVariations(variations: string): Either<InvalidVariationFormat, VariationResult> {
        let names: string[] = [];
        let values: string[] = [];

        const tokens = variations.split(";");
        const isValid = this.#isValidTokens(tokens);
        if (!isValid) return left(new InvalidVariationFormat(variations));

        for (const _ of tokens) {
            names = this.#readVariationNames(tokens);

            values = this.#readVariationsValues(tokens);
        }

        return right({ names, values });
    }

    #isCsvFile(file: File): boolean {
        return file.type === "text/csv";
    }

    #isValidFile(lines: string[]): Either<FileError, void> {
        if (!VALID_ITEM_CSV_HEADER.includes(lines[0].trim())) {
            return left(new InvalidFileHeader());
        }

        if (lines.length === 1) return left(new FileEmpty());

        return right(undefined);
    }

    #readVariationNames(tokens: string[]) {
        return tokens.map((v) => v.split("=").at(0)!);
    }

    #readVariationsValues(tokens: string[]): string[] {
        return tokens.map((v) => v.split("=").at(1)!);
    }

    #isValidTokens(tokens: string[]) {
        return tokens.every((token) => token.includes("="));
    }

    #increaseItemsStock(itemsStock: ItemStock[], lines: string[]) {
        for (const line of lines.slice(1)) {
            const [itemId, goodQuantities, badQuantities] = line.split(",");
            const itemStock = itemsStock.find((i) => i.itemId.toString() === itemId);

            if (!itemStock) break;

            if (Number.isNaN(goodQuantities)) break;

            if (badQuantities !== undefined && Number.isNaN(badQuantities)) break;

            itemStock.increase(Number(goodQuantities), Number(badQuantities));
        }
    }
}

interface VariationResult {
    names: string[];
    values: string[];
}
