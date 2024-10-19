import type { PrismaClient } from "@prisma/client";
import { GoodsReturnNote } from "../../domain/goods_return/goods_return_note";
import { GoodsReturnNoteLine } from "../../domain/goods_return/goods_return_note_line";
import { GoodsReturnNoteNotFound } from "../../domain/goods_return/goods_return_note_not_found_error";
import type { GoodsReturnNoteRepository } from "../../domain/goods_return/goods_return_note_repository";
import { type Either, left, right } from "../../shared/either";
import { ID } from "../../shared/id";

function goodsReturnNoteFactory(data: any) {
    const lines = data.lines.map((line: any) => {
        return new GoodsReturnNoteLine(
            ID.fromString(line.itemId),
            line.description,
            line.goodQuantities,
            line.badQuantities,
            JSON.parse(line.variations),
            line.comment,
        );
    });

    return new GoodsReturnNote(
        ID.fromString(data.noteId),
        ID.fromString(data.goodsIssueNoteId),
        lines,
        data.securityDepositWithheld,
        data.issuedAt,
    );
}

export class PostgresGoodsReturnNoteRepository
    implements GoodsReturnNoteRepository {
    #prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.#prisma = prisma;
    }

    async getById(
        noteId: ID,
    ): Promise<Either<GoodsReturnNoteNotFound, GoodsReturnNote>> {
        const noteData = await this.#prisma.goodsReturnNote.findUnique({
            where: { noteId: noteId.toString() },
            include: { lines: true },
        });

        if (!noteData) return left(new GoodsReturnNoteNotFound());

        return right(goodsReturnNoteFactory(noteData));
    }

    async getAll(): Promise<GoodsReturnNote[]> {
        const notesData = await this.#prisma.goodsReturnNote.findMany({
            include: { lines: true },
        });

        return notesData.map(goodsReturnNoteFactory);
    }

    async save(note: GoodsReturnNote): Promise<void> {
        await this.#prisma.goodsReturnNote.create({
            data: {
                noteId: note.noteId.toString(),
                goodsIssueNoteId: note.goodsIssueNoteId.toString(),
                securityDepositWithheld: note.securityDepositWithheld.value,
                userId: note.userId.toString(),
                issuedAt: note.issuedAt,
                lines: {
                    createMany: {
                        data: note.lines.map((line) => ({
                            lineId: line.lineId.toString(),
                            productId: line.itemId.toString(),
                            description: line.description,
                            goodQuantities: line.goodQuantities,
                            badQuantities: line.badQuantities,
                            comments: line.condition.comment,
                            variations: JSON.stringify(line.variationsValues),
                        })),
                    },
                },
            },
        });
    }
}
