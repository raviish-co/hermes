import type { PrismaClient } from "@prisma/client";
import { GoodsReceiptNote } from "../../domain/goods_receipt/goods_receipt_note";
import type { GoodsReceiptNoteRepository } from "../../domain/goods_receipt/goods_receipt_note_repository";
import { Condition } from "../../shared/condition";

function goodsReceiptNoteFactory(data: any) {
    const lines = data.receiptNoteLines.map((line: any) => ({
        receiptLineId: line.receiptLineId,
        itemId: line.productId,
        goodQuantities: line.goodQuantities,
        badQuantities: line.badQuantities,
        condition: new Condition(line.comments),
    }));
    return new GoodsReceiptNote(data.noteId, data.entryDate, lines);
}

export class PostgresGoodsReceiptNoteRepository implements GoodsReceiptNoteRepository {
    #prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.#prisma = prisma;
    }

    async getAll(): Promise<GoodsReceiptNote[]> {
        const notesData = await this.#prisma.goodsReceiptNote.findMany({
            include: { receiptNoteLines: true },
        });

        return notesData.map(goodsReceiptNoteFactory);
    }

    async save(note: GoodsReceiptNote): Promise<void> {
        await this.#prisma.goodsReceiptNote.create({
            data: {
                noteId: note.noteId.toString(),
                entryDate: note.entryDate,
                receiptNoteLines: {
                    createMany: {
                        data: note.lines.map((line) => ({
                            receiptLineId: line.receiptLineId.toString(),
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
