import type { PrismaClient } from "@prisma/client";
import { GoodsReceiptNote } from "../../domain/goods_receipt/goods_receipt_note";
import type { GoodsReceiptNoteRepository } from "../../domain/goods_receipt/goods_receipt_note_repository";
import { Condition } from "../../shared/condition";
import { GoodsReceiptNoteNotFoundError } from "../../domain/goods_receipt/goods_receipt_note_not_found_error";
import { left, right, type Either } from "../../shared/either";
import type { ID } from "../../shared/id";

function goodsReceiptNoteFactory(data: any) {
    const lines = data.lines.map((line: any) => ({
        lineId: line.lineId,
        itemId: line.productId,
        goodQuantities: line.goodQuantities,
        badQuantities: line.badQuantities,
        condition: new Condition(line.comments),
    }));
    return new GoodsReceiptNote(data.noteId, data.entryDate, lines, data.userId);
}

export class PostgresGoodsReceiptNoteRepository implements GoodsReceiptNoteRepository {
    #prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.#prisma = prisma;
    }

    async getAll(): Promise<GoodsReceiptNote[]> {
        const notesData = await this.#prisma.goodsReceiptNote.findMany({
            include: { lines: true },
        });

        return notesData.map(goodsReceiptNoteFactory);
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
