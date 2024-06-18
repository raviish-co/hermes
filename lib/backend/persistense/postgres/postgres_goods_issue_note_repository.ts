import type { PrismaClient } from "@prisma/client";
import { GoodsIssueNote } from "../../domain/goods_issue/goods_issue_note";
import { GoodsIssueNoteNotFound } from "../../domain/goods_issue/goods_issue_note_not_found_error";
import type { NoteOptions } from "../../domain/goods_issue/goods_issue_note_options";
import type { GoodsIssueNoteRepository } from "../../domain/goods_issue/goods_issue_note_repository";
import { left, right, type Either } from "../../shared/either";
import type { ID } from "../../shared/id";

export class PostgresGoodsIssueNoteRepository implements GoodsIssueNoteRepository {
    #prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.#prisma = prisma;
    }

    async getById(noteId: ID): Promise<Either<GoodsIssueNoteNotFound, GoodsIssueNote>> {
        const noteData = await this.#prisma.goodsIssueNote.findUnique({
            where: { noteId: noteId.toString() },
            include: { purpose: true, lines: true },
        });

        if (!noteData) return left(new GoodsIssueNoteNotFound());

        return right(GoodsIssueNote.restore(noteData as NoteOptions));
    }

    async getAll(): Promise<GoodsIssueNote[]> {
        const notesData = await this.#prisma.goodsIssueNote.findMany({
            include: { purpose: true, lines: true },
        });

        return notesData.map((note) => GoodsIssueNote.restore(note as NoteOptions));
    }

    async save(note: GoodsIssueNote): Promise<void> {
        await this.#prisma.goodsIssueNote.create({
            data: {
                noteId: note.noteId.toString(),
                purpose: {
                    create: {
                        description: note.purpose.description,
                        notes: note.purpose.notes,
                        details: note.purpose.details,
                    },
                },
                issuedAt: note.issuedAt,
                returnDate: note.returnDate,
                securityDeposit: note.securityDeposit.value,
                status: note.status,
                total: note.total.value,
                fulltext: note.fulltext,
                lines: {
                    createMany: {
                        data: note.lines.map((line) => ({
                            lineId: line.lineId.toString(),
                            productId: line.itemId.toString(),
                            name: line.name,
                            price: line.price.value,
                            netTotal: line.netTotal.value,
                            goodQuantities: line.goodQuantities,
                            badQuantities: line.badQuantities,
                            comments: line.condition?.comment,
                            goodQuantitiesReturned: line.goodQuantitiesReturned,
                            badQuantitiesReturned: line.badQuantitiesReturned,
                            variations: JSON.stringify(line.variationsValues ?? {}),
                        })),
                    },
                },
            },
        });
    }

    async search(query: string): Promise<GoodsIssueNote[]> {
        const notesData = await this.#prisma.goodsIssueNote.findMany({
            where: {
                OR: [
                    { noteId: { contains: query } },
                    { fulltext: { contains: query.toLowerCase() } },
                ],
            },
            include: { purpose: true, lines: true },
        });

        return notesData.map((note) => GoodsIssueNote.restore(note as NoteOptions));
    }

    async update(note: GoodsIssueNote): Promise<void> {
        await this.#prisma.goodsIssueNote.update({
            where: { noteId: note.noteId.toString() },
            data: {
                status: note.status,
                lines: {
                    updateMany: {
                        where: { noteId: note.noteId.toString() },
                        data: note.lines.map((line) => ({
                            where: { lineId: line.lineId.toString() },
                            data: {
                                goodQuantitiesReturned: line.goodQuantitiesReturned,
                                badQuantitiesReturned: line.badQuantitiesReturned,
                            },
                        })),
                    },
                },
            },
        });
    }

    last(): Promise<GoodsIssueNote> {
        throw new Error("Method not implemented.");
    }
}
