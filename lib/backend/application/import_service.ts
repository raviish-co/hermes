import { InvalidVariationFormat } from "../domain/catalog/invalid_variation_format_error";
import type { VariationRepository } from "../domain/catalog/variation_repository";
import type { CategoryRepository } from "../domain/catalog/category_repository";
import { InvalidFileHeader } from "../domain/readers/invalid_file_header_error";
import { FileNotSupported } from "../domain/readers/file_not_supported_error";
import type { SectionRepository } from "../domain/catalog/section_repository";
import { CsvReader, VALID_CSV_HEADER } from "../domain/readers/csv_reader";
import { SequenceGenerator } from "../domain/sequences/sequence_generator";
import type { ItemRepository } from "../domain/catalog/item_repository";
import { Item, type Condition, Status } from "../domain/catalog/item";
import { FileEmpty } from "../domain/readers/file_empty_error";
import type { Variation } from "../domain/catalog/variation";
import { ItemBuilder } from "../domain/catalog/item_builder";
import { left, right, type Either } from "../shared/either";
import { Sequence } from "../domain/sequences/sequence";
import type { FileError } from "../shared/errors";
import { Decimal } from "../shared/decimal";

export class ImportService {
    #itemRepository: ItemRepository;
    #categoryRepository: CategoryRepository;
    #sectionRepository: SectionRepository;
    #variationRepository: VariationRepository;
    #generator: SequenceGenerator;

    constructor(
        itemRepository: ItemRepository,
        categoryRepository: CategoryRepository,
        sectionRepository: SectionRepository,
        variationRepository: VariationRepository,
        generator: SequenceGenerator
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

        const condition = this.#makeItemCondition(comment);

        const variations = this.#makeItemVariationsValues(
            variationsOrErr.value,
            resultOrErr.value.values
        );
        const itemId = this.#generator.generate(Sequence.Item);
        const itemOrErr = new ItemBuilder()
            .withItemId(itemId)
            .withName(name)
            .withPrice(Decimal.fromString(price))
            .withCategoryId(categoryOrErr.value.categoryId)
            .withCondition(condition)
            .withStock(Number(quantity))
            .withSectionId(sectionOrErr.value.sectionId)
            .withVariationsValues(variations)
            .build();

        if (itemOrErr.isLeft()) return left(itemOrErr.value);

        return right(itemOrErr.value);
    }

    #makeItemCondition(comment: string) {
        const condition: Condition = { status: Status.Good };
        if (comment) {
            condition.status = Status.Bad;
            condition.comment = comment;
        }
        return condition;
    }

    #makeItemVariationsValues(variations: Variation[], values: string[]): Record<string, string> {
        const result: Record<string, string> = {};
        for (const variation of variations) {
            const value = values[variations.indexOf(variation)];
            result[variation.variationId.toString()] = variation.name + ": " + value;
        }
        return result;
    }

    #extractVariations(variations: string): Either<Error, VariationResult> {
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
        if (!VALID_CSV_HEADER.includes(lines[0])) {
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
