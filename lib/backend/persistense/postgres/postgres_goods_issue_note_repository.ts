import type { PrismaClient } from "@prisma/client";
import type { NoteOptions } from "../../domain/goods_issue/goods_issue_note_options";
import { GoodsIssueNote } from "../../domain/goods_issue/goods_issue_note";
import { GoodsIssueNoteNotFound } from "../../domain/goods_issue/goods_issue_note_not_found_error";
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

        return right(GoodsIssueNote.restore(noteData as unknown as NoteOptions));
    }

    getAll(): Promise<GoodsIssueNote[]> {
        throw new Error("Method not implemented.");
    }

    save(note: GoodsIssueNote): Promise<void> {
        throw new Error("Method not implemented.");
    }

    search(query: string): Promise<GoodsIssueNote[]> {
        throw new Error("Method not implemented.");
    }

    update(note: GoodsIssueNote): Promise<void> {
        throw new Error("Method not implemented.");
    }

    last(): Promise<GoodsIssueNote> {
        throw new Error("Method not implemented.");
    }
}
