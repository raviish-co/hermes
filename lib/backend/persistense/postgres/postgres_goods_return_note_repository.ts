import type { PrismaClient } from "@prisma/client";
import { GoodsReturnNote } from "../../domain/goods_return/goods_return_note";
import { GoodsReturnNoteLine } from "../../domain/goods_return/goods_return_note_line";
import { GoodsReturnNoteNotFound } from "../../domain/goods_return/goods_return_note_not_found_error";
import type { GoodsReturnNoteRepository } from "../../domain/goods_return/goods_return_note_repository";
import { left, right, type Either } from "../../shared/either";
import { ID } from "../../shared/id";

function goodsReturnNoteFactory(data: any) {
    const lines = data.lines.map((line: any) => {
        return new GoodsReturnNoteLine(
            ID.fromString(line.itemId),
            line.description,
            line.goodQuantities,
            line.badQuantities,
            line.variations,
            line.comment
        );
    });

    return new GoodsReturnNote(
        ID.fromString(data.noteId),
        ID.fromString(data.goodsIssueNoteId),
        lines,
        data.securityDepositWithheld,
        data.issuedAt
    );
}

export class PostgresGoodsReturnNoteRepository implements GoodsReturnNoteRepository {
    #prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.#prisma = prisma;
    }

    async getById(noteId: ID): Promise<Either<GoodsReturnNoteNotFound, GoodsReturnNote>> {
        const noteData = await this.#prisma.goodsReturnNote.findUnique({
            where: { noteId: noteId.toString() },
            include: { lines: true },
        });

        if (!noteData) return left(new GoodsReturnNoteNotFound());

        return right(goodsReturnNoteFactory(noteData));
    }

    getAll(): Promise<GoodsReturnNote[]> {
        throw new Error("Method not implemented.");
    }

    save(note: GoodsReturnNote): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
