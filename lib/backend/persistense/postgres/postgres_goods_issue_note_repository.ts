import type { PrismaClient } from "@prisma/client";
import type { GoodsIssueNote } from "../../domain/goods_issue/goods_issue_note";
import type { GoodsIssueNoteNotFound } from "../../domain/goods_issue/goods_issue_note_not_found_error";
import type { GoodsIssueNoteRepository } from "../../domain/goods_issue/goods_issue_note_repository";
import type { Either } from "../../shared/either";
import type { ID } from "../../shared/id";

export class PostgresGoodsIssueNoteRepository implements GoodsIssueNoteRepository {
    #prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.#prisma = prisma;
    }

    async getById(noteId: ID): Promise<Either<GoodsIssueNoteNotFound, GoodsIssueNote>> {
        await this.#prisma.goodsIssueNote.findUnique({ where: { noteId: noteId.toString() } });
        return {} as unknown as Either<GoodsIssueNoteNotFound, GoodsIssueNote>;
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
