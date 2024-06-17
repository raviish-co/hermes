import { PrismaClient } from "@prisma/client";
import { describe, expect, it, vi } from "vitest";
import { PostgresGoodsIssueNoteRepository } from "../../persistense/postgres/postgres_goods_issue_note_repository";
import { ID } from "../../shared/id";

describe("PostgresGoodsIssueNoteRepository - geById", () => {
    it("Deve encontrar a guia de saída pelo seu ID", async () => {
        const noteId = ID.random();
        const noteRepository = new PostgresGoodsIssueNoteRepository(prisma);
        const spy = vi.spyOn(prisma.goodsIssueNote, "findUnique");

        await noteRepository.getById(noteId);

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({ where: { noteId: noteId.toString() } });
    });
});

const prisma = {
    goodsIssueNote: {
        findUnique: async (_args: object) => ({}),
    },
} as unknown as PrismaClient;
