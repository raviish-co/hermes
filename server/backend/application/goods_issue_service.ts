import type { Generator } from "../adapters/sequences/generator";
import type { IHashGenerator, HashGeneratorData } from "../adapters/hash_generator";
import type { PdfGenerator, NoteData } from "../adapters/pdf/pdf_generator";
import { Sequence } from "../adapters/sequences/sequence";
import { InsufficientStock } from "../domain/catalog/items/insufficient_stock_error";
import type { Item } from "../domain/catalog/items/item";
import type { ItemRepository } from "../domain/catalog/items/item_repository";
import type { GoodsIssueNote } from "../domain/goods_issue/goods_issue_note";
import { GoodsIssueNoteBuilder } from "../domain/goods_issue/goods_issue_note_builder";
import { GoodsIssueNoteLine } from "../domain/goods_issue/goods_issue_note_line";
import { GoodsIssueNoteNotFound } from "../domain/goods_issue/goods_issue_note_not_found_error";
import type { GoodsIssueNoteRepository } from "../domain/goods_issue/goods_issue_note_repository";
import { InvalidPurpose } from "../domain/goods_issue/invalid_purpose_error";
import { InvalidTotal } from "../domain/goods_issue/invalid_total_error";
import { Purpose } from "../domain/goods_issue/purpose";
import type { PurposeSpecification } from "../domain/goods_issue/purpose_specification";
import type { ItemStockRepository } from "../domain/warehouse/item_stock_repository";
import { type Either, left, right } from "../shared/either";
import type { GoodsIssueNoteError } from "../shared/errors";
import { ID } from "../shared/id";
import type { Pagination } from "../shared/pagination";
import { formatCurrency, formatDate, formatDateTime } from "./helpers";
import { ValidationError } from "./validation_error";

export class GoodsIssueService {
    #itemRepository: ItemRepository;
    #itemStockRepository: ItemStockRepository;
    #noteRepository: GoodsIssueNoteRepository;
    #purposeSpecification: PurposeSpecification;
    #sequenceGenerator: Generator;
    #hashGenerator: IHashGenerator;
    #pdfGenerator: PdfGenerator;

    constructor(
        itemRepository: ItemRepository,
        itemStockRepository: ItemStockRepository,
        noteRepository: GoodsIssueNoteRepository,
        sequenceGenerator: Generator,
        purposeSpecification: PurposeSpecification,
        hashGenerator: IHashGenerator,
        pdfGenerator: PdfGenerator,
    ) {
        this.#itemRepository = itemRepository;
        this.#itemStockRepository = itemStockRepository;
        this.#noteRepository = noteRepository;
        this.#purposeSpecification = purposeSpecification;
        this.#sequenceGenerator = sequenceGenerator;
        this.#hashGenerator = hashGenerator;
        this.#pdfGenerator = pdfGenerator;
    }

    async new(data: NoteDTO): Promise<Either<GoodsIssueNoteError, void>> {
        const purpose = this.#buildPurpose(data.purpose);
        if (!this.#purposeSpecification.isSatisfiedBy(purpose)) {
            return left(new InvalidPurpose(data.purpose.description));
        }

        const itemsIds = this.#buildItemsIds(data.lines);
        const itemsOrErr = await this.#itemRepository.findAll(itemsIds);
        if (itemsOrErr.isLeft()) return left(itemsOrErr.value);

        const voidOrErr = await this.#reduceStockAndCalculateTotalValueOfOutputs(
            itemsOrErr.value,
            data,
        );
        if (voidOrErr.isLeft()) return left(voidOrErr.value);

        const lines = this.#buildNoteLines(itemsOrErr.value, data.lines);
        const noteId = await this.#buildNoteId();
        const noteOrErr = new GoodsIssueNoteBuilder()
            .withNoteId(noteId)
            .withPurpose(purpose)
            .withReturnDate(data.returnDate)
            .withUser(data.userId)
            .withLines(lines)
            .build();

        if (noteOrErr.isLeft()) return left(noteOrErr.value);

        if (!noteOrErr.value.isSameTotal(data.total)) {
            return left(new InvalidTotal());
        }

        const note = await this.#addHashToNote(noteOrErr.value);

        await this.#noteRepository.save(note);

        return right(undefined);
    }

    async list(pageToken = 1, perPage = 12): Promise<Pagination<GoodsIssueNote>> {
        return await this.#noteRepository.getAll({ pageToken, perPage });
    }

    async get(noteId: string): Promise<Either<GoodsIssueNoteNotFound, GoodsIssueNote>> {
        const noteOrErr = await this.#noteRepository.getById(ID.fromString(noteId));
        if (noteOrErr.isLeft()) return left(noteOrErr.value);

        return right(noteOrErr.value);
    }

    async search(query: string): Promise<GoodsIssueNote[]> {
        return await this.#noteRepository.search(query);
    }

    async generatePDF(data: {
        noteId: string;
        destinationName: string;
        destinationNIF: string;
        destinationAddress: string;
    }): Promise<Either<GoodsIssueNoteError, File>> {
        const errors: string[] = [];

        if (!data.noteId) {
            errors.push("O ID da guia é obrigatório.");
        }

        if (!data.destinationName) {
            errors.push("O nome do destinatário é obrigatório.");
        }

        if (!data.destinationNIF) {
            errors.push("O NIF do destinatário é obrigatório.");
        }

        if (!data.destinationAddress) {
            errors.push("O endereço do destinatário é obrigatório.");
        }

        if (errors.length > 0) {
            return left(new ValidationError(errors, "GoodsIssueService.generatePDF"));
        }

        const noteOrErr = await this.#noteRepository.getById(ID.fromString(data.noteId));
        if (noteOrErr.isLeft()) return left(noteOrErr.value);

        const note = noteOrErr.value;

        const noteData = this.#convertDataToNoteData(note, {
            name: data.destinationName,
            NIF: data.destinationNIF,
            address: data.destinationAddress,
        });

        const fileOrErr = await this.#pdfGenerator.generate(noteData);
        if (fileOrErr.isLeft()) return left(fileOrErr.value);

        return right(fileOrErr.value);
    }

    async #buildNoteId() {
        return await this.#sequenceGenerator.generate(Sequence.GoodIssueNote);
    }

    #buildPurpose(data: PurposeDTO) {
        return new Purpose(data.description, data.notes, data.details);
    }

    #buildItemsIds(lines: NoteLineDTO[]): ID[] {
        return lines.map((line) => ID.fromString(line.itemId));
    }

    #buildNoteLines(items: Item[], lines: NoteLineDTO[]): GoodsIssueNoteLine[] {
        const result: GoodsIssueNoteLine[] = [];
        for (const idx in items) {
            const noteLine = this.#buildLine(items[idx], lines[idx]);
            result.push(noteLine);
        }

        return result;
    }

    #buildLine(item: Item, line: NoteLineDTO) {
        return new GoodsIssueNoteLine(
            item.itemId,
            item.name,
            item.price,
            line.goodQuantities,
            line.badQuantities,
            item.variations,
            line.comment,
        );
    }

    async #reduceStockAndCalculateTotalValueOfOutputs(
        items: Item[],
        data: NoteDTO,
    ): Promise<Either<InsufficientStock, void>> {
        const itemsIds = this.#buildItemsIds(data.lines);

        const itemsStock = await this.#itemStockRepository.findAll(itemsIds);

        for (const idx in itemsStock) {
            const item = items[idx];
            const line = data.lines[idx];

            const stock = itemsStock.find((stock) => stock.itemId.equals(item.itemId))!;

            if (!stock.canReduce(line.goodQuantities, line.badQuantities)) {
                return left(new InsufficientStock(item.itemId.toString()));
            }

            stock.reduce(line.goodQuantities, line.badQuantities);

            const totalItemQuantities = line.goodQuantities + (line.badQuantities ?? 0);
            const itemTotalPrice = item.price.value * totalItemQuantities;

            stock.calculateTotalValueOfOutputs(itemTotalPrice);
        }

        await this.#itemStockRepository.saveAll(itemsStock);

        return right(undefined);
    }

    async #addHashToNote(note: GoodsIssueNote): Promise<GoodsIssueNote> {
        const lastNote = await this.#noteRepository.last();

        const noteDate = formatDate(note.returnDate);
        const issuedAt = formatDateTime(note.issuedAt);

        const hashData: HashGeneratorData = {
            noteDate,
            issuedAt,
            noteId: note.noteId.toString(),
            totalValue: note.total.value,
            previousHash: lastNote?.hash,
        };

        const hash = await this.#hashGenerator.generateHash(hashData);
        note.setHash(hash);

        if (lastNote?.hash) {
            note.setPreviousHash(lastNote.hash);
        }

        return note;
    }

    #convertDataToNoteData(
        note: GoodsIssueNote,
        destination: {
            name: string;
            NIF: string;
            address: string;
        },
    ): NoteData {
        return {
            noteId: note.noteId.toString(),
            purpose: {
                description: note.purpose.description,
                details: note.purpose.details,
                notes: note.purpose.notes,
            },
            userId: note.userId.toString(),
            dateIssue: formatDateTime(note.issuedAt),
            dateReturn: formatDateTime(note.returnDate),
            total: formatCurrency(note.total),
            securityDeposit: formatCurrency(note.securityDeposit),
            hash: note.hash ? this.#getShortHash(note.hash) : "0",
            lines: note.lines.map((line) => ({
                itemId: line.itemId.toString(),
                name: line.name,
                goodQuantities: line.goodQuantities,
                badQuantities: line.badQuantities,
                price: formatCurrency(line.price),
                totalQuantities: line.goodQuantities + (line.badQuantities ?? 0),
                netTotal: formatCurrency(line.netTotal),
            })),
            destination: {
                name: destination.name,
                NIF: destination.NIF,
                address: destination.address,
            },
        };
    }

    #getShortHash(fullHash: string): string {
        return fullHash.charAt(0) + fullHash.charAt(10) + fullHash.charAt(20) + fullHash.charAt(30);
    }
}

type NoteDTO = {
    purpose: PurposeDTO;
    lines: NoteLineDTO[];
    userId: string;
    total: number;
    returnDate: string;
};

type NoteLineDTO = {
    itemId: string;
    goodQuantities: number;
    badQuantities?: number;
    comment?: string;
};

type PurposeDTO = {
    description: string;
    details?: string;
    notes: string;
};
