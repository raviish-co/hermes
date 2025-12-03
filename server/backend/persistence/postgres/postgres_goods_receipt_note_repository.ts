import type { PrismaClient } from "@prisma/client";
import { GoodsReceiptNote } from "../../domain/goods_receipt/goods_receipt_note";
import type { GoodsReceiptNoteRepository } from "../../domain/goods_receipt/goods_receipt_note_repository";
import { Condition } from "../../shared/condition";
import { GoodsReceiptNoteNotFoundError } from "../../domain/goods_receipt/goods_receipt_note_not_found_error";
import { left, right, type Either } from "../../shared/either";
import type { ID } from "../../shared/id";
import type { Pagination, PaginatorOptions } from "../../shared/pagination";

function goodsReceiptNoteFactory(data: any) {
    const lines = data.lines.map((line: any) => ({
        lineId: line.lineId,
        itemId: line.productId,
        goodQuantities: line.goodQuantities,
        badQuantities: line.badQuantities,
        condition: new Condition(line.comments),
        consignmentValue: line.consignmentValue,
        itemStockType: line.itemStockType,
    }));
    return new GoodsReceiptNote(data.noteId, data.entryDate, lines, data.userId);
}

export class PostgresGoodsReceiptNoteRepository implements GoodsReceiptNoteRepository {
    #prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.#prisma = prisma;
    }

    async getAll(opts?: PaginatorOptions): Promise<Pagination<GoodsReceiptNote>> {
        if (!opts) {
            const notesData = await this.#prisma.goodsReceiptNote.findMany({
                include: { lines: true },
            });

            const notes = notesData
                .map(goodsReceiptNoteFactory)
                .sort((a, b) => b.noteId.localeCompare(a.noteId.toString()));

            return {
                result: notes,
                pageToken: 0,
                perPage: 0,
                total: notes.length,
            };
        }

        const notesData = await this.#prisma.goodsReceiptNote.findMany({
            include: { lines: true },
            skip: (opts.pageToken - 1) * opts.perPage,
            take: opts.perPage,
        });

        const total = await this.#prisma.goodsReceiptNote.count();

        const notes = notesData.map(goodsReceiptNoteFactory);

        return {
            result: notes,
            pageToken: opts.pageToken,
            perPage: opts.perPage,
            total: Math.ceil(total / opts.perPage),
        };
    }

    async getById(noteId: ID): Promise<Either<GoodsReceiptNoteNotFoundError, GoodsReceiptNote>> {
        const goodsReceiptNote = await this.#prisma.goodsReceiptNote.findFirst({
            where: { noteId: noteId.toString() },
        });

        if (!goodsReceiptNote) {
            return left(
                new GoodsReceiptNoteNotFoundError(
                    "PostgresGoodsReceiptNoteRepository:getById",
                    noteId.toString()
                )
            );
        }

        return right(goodsReceiptNoteFactory(goodsReceiptNote));
    }

    async save(note: GoodsReceiptNote): Promise<void> {
        await this.#prisma.goodsReceiptNote.create({
            data: {
                noteId: note.noteId.toString(),
                entryDate: note.entryDate,
                userId: note.userId.toString(),
                lines: {
                    createMany: {
                        data: note.lines.map((line) => ({
                            lineId: line.lineId.toString(),
                            productId: line.itemId.toString(),
                            goodQuantities: line.goodQuantities,
                            badQuantities: line.badQuantities,
                            comments: line.condition.comment,
                            consignmentValue: line.consignmentValue,
                            itemStockType: line.itemStockType,
                        })),
                    },
                },
            },
        });
    }

    last(): Promise<GoodsReceiptNote> {
        throw new Error("Method not implemented.");
    }
}
