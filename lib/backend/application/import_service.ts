import {
    processLine as buildCsvRow,
    VALID_ITEM_STOCK_CSV_HEADER,
    type CsvRow,
} from "../adapters/readers/default_csv_reader";
import { FileEmpty } from "../adapters/readers/file_empty_error";
import { InvalidCsvRow } from "../adapters/readers/file_empty_line_error";
import { FileNotSupported } from "../adapters/readers/file_not_supported_error";
import { InvalidFileHeader } from "../adapters/readers/invalid_file_header_error";
import type { CsvReader } from "../adapters/readers/reader";
import type { Generator } from "../adapters/sequences/generator";
import { Sequence } from "../adapters/sequences/sequence";
import type { CategoryRepository } from "../domain/catalog/categories/category_repository";
import type { SectionRepository } from "../domain/catalog/departments/section_repository";
import type { Item } from "../domain/catalog/items/item";
import { ItemBuilder } from "../domain/catalog/items/item_builder";
import type { ItemRepository } from "../domain/catalog/items/item_repository";
import type { Variation } from "../domain/catalog/variations/variation";
import type { VariationRepository } from "../domain/catalog/variations/variation_repository";
import { GoodsReceiptNoteBuilder } from "../domain/goods_receipt/goods_receipt_note_builder";
import { GoodsReceiptNoteLine } from "../domain/goods_receipt/goods_receipt_note_line";
import type { GoodsReceiptNoteRepository } from "../domain/goods_receipt/goods_receipt_note_repository";
import type { ItemStock } from "../domain/warehouse/item_stock";
import { ItemStockNotFound } from "../domain/warehouse/item_stock_not_found";
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
    #noteRepository: GoodsReceiptNoteRepository;
    #generator: Generator;
    #reader: CsvReader;

    constructor(
        itemRepository: ItemRepository,
        itemStockRepository: ItemStockRepository,
        categoryRepository: CategoryRepository,
        sectionRepository: SectionRepository,
        variationRepository: VariationRepository,
        noteRepository: GoodsReceiptNoteRepository,
        generator: Generator,
        reader: CsvReader
    ) {
        this.#itemRepository = itemRepository;
        this.#itemStockRepository = itemStockRepository;
        this.#categoryRepository = categoryRepository;
        this.#sectionRepository = sectionRepository;
        this.#variationRepository = variationRepository;
        this.#noteRepository = noteRepository;
        this.#generator = generator;
        this.#reader = reader;
    }

    async uploadItems(file: File): Promise<Either<FileError, void>> {
        if (!this.#isCsvFile(file)) return left(new FileNotSupported());
        const lines = await this.#reader.read(file);

        if (this.#isEmptyFile(lines)) return left(new FileEmpty());

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

        if (this.#hasIncompleteItemsStock(itemsStock, itemsIds)) {
            return left(new ItemStockNotFound());
        }

        const noteId = await this.#generator.generate(Sequence.GoodsReceiptNote);
        const entryDate = new Date();
        const noteOrErr = new GoodsReceiptNoteBuilder()
            .withNoteId(noteId)
            .withLines(this.#buildNoteLines(itemsStock))
            .withEntryDate(entryDate.toISOString())
            .build();

        if (noteOrErr.isLeft()) return left(noteOrErr.value);

        await this.#noteRepository.save(noteOrErr.value);

        this.#increaseItemsStock(itemsStock, lines);

        this.#itemStockRepository.saveAll(itemsStock);

        return right(undefined);
    }

    async #buildItems(lines: string[]): Promise<Either<Error, Item[]>> {
        const items: Item[] = [];

        for (const line of lines.slice(1)) {
            const csvRow = buildCsvRow(line, lines);
            const itemOrErr = await this.#processCsvRow(csvRow);

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

    #buildNoteLines(itemsStock: ItemStock[]) {
        const lines: GoodsReceiptNoteLine[] = [];

        for (const itemStock of itemsStock) {
            const line = new GoodsReceiptNoteLine(
                itemStock.itemId,
                itemStock.goodQuantities,
                itemStock.badQuantities
            );
            lines.push(line);
        }

        return lines;
    }

    async #processCsvRow(csvRow: CsvRow): Promise<Either<Error, Item>> {
        if (!csvRow.name.trim() || !csvRow.price) return left(new InvalidCsvRow());

        const categoryOrErr = await this.#buildCategory(csvRow);
        if (categoryOrErr.isLeft()) return left(categoryOrErr.value);

        const sectionOrErr = await this.#buildSection(csvRow);
        if (sectionOrErr.isLeft()) return left(sectionOrErr.value);

        const itemId = await this.#generator.generate(Sequence.Item);
        const itemOrErr = new ItemBuilder()
            .withItemId(itemId)
            .withName(csvRow.name)
            .withPrice(new Decimal(csvRow.price))
            .withCategoryId(categoryOrErr.value?.categoryId)
            .withSectionId(sectionOrErr.value?.sectionId)
            .withVariationsValues(categoryOrErr.value?.variations)
            .build();

        if (itemOrErr.isLeft()) return left(itemOrErr.value);

        return right(itemOrErr.value);
    }

    #makeVariationsValues(variations: Variation[], values: string[]): Record<string, string> {
        const result: Record<string, string> = {};
        for (const variation of variations) {
            const value = values[variations.indexOf(variation)];
            result[variation.variationId.toString()] = `${variation.name}: ${value}`;
        }
        return result;
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

    async #buildCategory(csvRow: CsvRow): Promise<Either<Error, CategorRow>> {
        if (!csvRow.category.trim()) return right({ categoryId: "", variations: {} });

        const categoryOrErr = await this.#categoryRepository.findByName(csvRow.category);
        if (categoryOrErr.isLeft()) return left(categoryOrErr.value);

        const variationsNames = Object.keys(csvRow.variations).map((v) =>
            (v.charAt(0).toUpperCase() + v.slice(1)).trim()
        );
        const variationsValues = Object.values(csvRow.variations).map((v) =>
            (v.charAt(0).toUpperCase() + v.slice(1)).trim()
        );

        const variationsOrErr = await this.#variationRepository.findByNames(variationsNames);
        if (variationsOrErr.isLeft()) return left(variationsOrErr.value);

        const voidOrErr = await this.#variationRepository.verifyValues(variationsValues);
        if (voidOrErr.isLeft()) return left(voidOrErr.value);

        const variations = this.#makeVariationsValues(
            variationsOrErr.value,
            Object.values(csvRow.variations)
        );

        return right({
            categoryId: categoryOrErr.value.categoryId.toString(),
            variations: variations,
        });
    }

    async #buildSection(csvRow: CsvRow): Promise<Either<Error, SectionRow>> {
        if (!csvRow.section.trim()) return right({ sectionId: "" });

        const sectionOrErr = await this.#sectionRepository.findByName(csvRow.section);
        if (sectionOrErr.isLeft()) return left(sectionOrErr.value);

        return right({ sectionId: sectionOrErr.value.sectionId.toString() });
    }

    #hasIncompleteItemsStock(itemsStock: ItemStock[], itemsIds: ID[]) {
        return itemsStock.length !== itemsIds.length;
    }

    #isCsvFile(file: File): boolean {
        return file.type === "text/csv";
    }

    #isEmptyFile(lines: string[]): boolean {
        return lines.length <= 1;
    }
}

type CategorRow = {
    categoryId: string;
    variations: Record<string, string>;
};

type SectionRow = {
    sectionId: string;
};
