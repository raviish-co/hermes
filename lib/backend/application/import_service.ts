import { InvalidVariationFormat } from "../domain/catalog/variations/invalid_variation_format_error";
import type { VariationRepository } from "../domain/catalog/variations/variation_repository";
import type { CategoryRepository } from "../domain/catalog/categories/category_repository";
import { InvalidFileHeader } from "../adapters/readers/invalid_file_header_error";
import { FileNotSupported } from "../adapters/readers/file_not_supported_error";
import type { SectionRepository } from "../domain/catalog/sections/section_repository";
import { CsvReader, VALID_CSV_HEADER } from "../adapters/readers/csv_reader";
import type { ItemRepository } from "../domain/catalog/items/item_repository";
import { FileEmpty } from "../adapters/readers/file_empty_error";
import type { Generator } from "../adapters/sequences/generator";
import type { Variation } from "../domain/catalog/variations/variation";
import { ItemBuilder } from "../domain/catalog/items/item_builder";
import { left, right, type Either } from "../shared/either";
import { Sequence } from "../adapters/sequences/sequence";
import type { FileError } from "../shared/errors";
import { Item } from "../domain/catalog/items/item";
import { Decimal } from "../shared/decimal";

export class ImportService {
    #itemRepository: ItemRepository;
    #categoryRepository: CategoryRepository;
    #sectionRepository: SectionRepository;
    #variationRepository: VariationRepository;
    #generator: Generator;

    constructor(
        itemRepository: ItemRepository,
        categoryRepository: CategoryRepository,
        sectionRepository: SectionRepository,
        variationRepository: VariationRepository,
        generator: Generator
    ) {
        this.#categoryRepository = categoryRepository;
        this.#itemRepository = itemRepository;
        this.#sectionRepository = sectionRepository;
        this.#variationRepository = variationRepository;
        this.#generator = generator;
    }

    async uploadItems(file: File): Promise<Either<FileError, void>> {
        if (!this.#isCsvFile(file)) return Promise.resolve(left(new FileNotSupported()));

        const csvReader = new CsvReader();
        const lines = await csvReader.read(file);

        const validOrErr = this.#isValidFile(lines);
        if (validOrErr.isLeft()) return Promise.resolve(left(validOrErr.value));

        const itemsOrErr = await this.#buildItems(lines);
        if (itemsOrErr.isLeft()) return left(itemsOrErr.value);

        await this.#itemRepository.saveAll(itemsOrErr.value);

        return Promise.resolve(right(undefined));
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

    async #parseLine(line: string): Promise<Either<Error, Item>> {
        const [name, price, quantity, comment, categoryName, sectionName, variationsTokens] =
            line.split(",");

        const resultOrErr = this.#extractVariations(variationsTokens);
        if (resultOrErr.isLeft()) return left(resultOrErr.value);

        const categoryOrErr = await this.#categoryRepository.findByName(categoryName);
        const sectionOrErr = await this.#sectionRepository.findByName(sectionName);
        const variationsOrErr = await this.#variationRepository.findByNames(
            resultOrErr.value.names
        );

        if (categoryOrErr.isLeft()) return left(categoryOrErr.value);

        if (sectionOrErr.isLeft()) return left(sectionOrErr.value);

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
            .withCondition(comment)
            .withStock(Number(quantity))
            .withSectionId(sectionOrErr.value.sectionId)
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
        if (!VALID_CSV_HEADER.includes(lines[0].trim())) {
            return left(new InvalidFileHeader());
        }

        if (lines.length === 1) {
            return left(new FileEmpty());
        }

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
}

interface VariationResult {
    names: string[];
    values: string[];
}
