import { processLine, VALID_ITEM_STOCK_CSV_HEADER } from "../adapters/readers/csv_reader";
import { FileEmpty } from "../adapters/readers/file_empty_error";
import { EmptyLine } from "../adapters/readers/file_empty_line_error";
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
import type { Variation } from "../domain/catalog/variations/variation";
import type { VariationRepository } from "../domain/catalog/variations/variation_repository";
import { GoodsReceiptNoteBuilder } from "../domain/goods_receipt/goods_receipt_note_builder";
import { GoodsReceiptNoteLine } from "../domain/goods_receipt/goods_receipt_note_line";
import type { GoodsReceiptNoteRepository } from "../domain/goods_receipt/goods_receipt_note_repository";
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
    #goodsReceiptNoteRepository: GoodsReceiptNoteRepository;
    #generator: Generator;
    #reader: Reader;

    constructor(
        itemRepository: ItemRepository,
        itemStockRepository: ItemStockRepository,
        categoryRepository: CategoryRepository,
        sectionRepository: SectionRepository,
        variationRepository: VariationRepository,
        goodsReceiptNoteRepository: GoodsReceiptNoteRepository,
        generator: Generator,
        reader: Reader
    ) {
        this.#itemRepository = itemRepository;
        this.#itemStockRepository = itemStockRepository;
        this.#categoryRepository = categoryRepository;
        this.#sectionRepository = sectionRepository;
        this.#variationRepository = variationRepository;
        this.#goodsReceiptNoteRepository = goodsReceiptNoteRepository;
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
        const itemsStockOrErr = await this.#itemStockRepository.findAll(itemsIds);
        if (itemsStockOrErr.isLeft()) return left(itemsStockOrErr.value);

        const noteLines = this.buildNoteLines(itemsStockOrErr.value);

        const noteId = await this.#generator.generate(Sequence.GoodsReceiptNote);
        const entryDate = new Date();
        const noteOrErr = new GoodsReceiptNoteBuilder()
            .withNoteId(noteId)
            .withLines(noteLines)
            .withEntryDate(entryDate.toISOString())
            .build();

        if (noteOrErr.isLeft()) return left(noteOrErr.value);

        await this.#goodsReceiptNoteRepository.save(noteOrErr.value);

        this.#increaseItemsStock(itemsStockOrErr.value, lines);
        this.#itemStockRepository.updateAll(itemsStockOrErr.value);

        return right(undefined);
    }

    async #buildItems(lines: string[]): Promise<Either<Error, Item[]>> {
        const items: Item[] = [];

        for (const line of lines.slice(1)) {
            const itemOrErr = await this.#buildLine(line, lines);
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

    buildNoteLines(itemsStock: ItemStock[]) {
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

    async #buildLine(line: string, headers: string[]): Promise<Either<Error, Item>> {
        const values = line.split(",").map((v) => v.trim());
        if (values.includes("")) return left(new EmptyLine());

        const csvRow = processLine(line, headers);
        const variationsNames = Object.keys(csvRow.variations).map((v) =>
            (v.charAt(0).toUpperCase() + v.slice(1)).trim()
        );
        const variationsValues = Object.values(csvRow.variations).map((v) =>
            (v.charAt(0).toUpperCase() + v.slice(1)).trim()
        );

        const categoryOrErr = await this.#categoryRepository.findByName(csvRow.category);
        if (categoryOrErr.isLeft()) return left(categoryOrErr.value);

        const sectionOrErr = await this.#sectionRepository.findByName(csvRow.section);
        if (sectionOrErr.isLeft()) return left(sectionOrErr.value);

        const variationsOrErr = await this.#variationRepository.findByNames(variationsNames);
        if (variationsOrErr.isLeft()) return left(variationsOrErr.value);

        const voidOrErr = await this.#variationRepository.verifyValues(variationsValues);
        if (voidOrErr.isLeft()) return left(voidOrErr.value);

        const variations = this.#makeItemVariationsValues(
            variationsOrErr.value,
            Object.values(csvRow.variations)
        );
        const categoryId = categoryOrErr.value.categoryId.toString();
        const itemId = await this.#generator.generate(Sequence.Item);
        const itemOrErr = new ItemBuilder()
            .withItemId(itemId)
            .withName(csvRow.name)
            .withPrice(new Decimal(csvRow.price))
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

    #isCsvFile(file: File): boolean {
        return file.type === "text/csv";
    }

    #isEmptyFile(lines: string[]): boolean {
        return lines.length <= 1;
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
