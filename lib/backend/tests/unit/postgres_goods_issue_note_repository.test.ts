import { PrismaClient } from "@prisma/client";
import { describe, expect, it, vi } from "vitest";
import type { GoodsIssueNote } from "../../domain/goods_issue/goods_issue_note";
import { PostgresGoodsIssueNoteRepository } from "../../persistense/postgres/postgres_goods_issue_note_repository";
import { ID } from "../../shared/id";
import { GoodsIssueNoteNotFound } from "../../domain/goods_issue/goods_issue_note_not_found_error";

describe("PostgresGoodsIssueNoteRepository - geById", () => {
    it("Deve encontrar a guia de saída pelo seu ID", async () => {
        const noteId = ID.random();
        const noteRepository = new PostgresGoodsIssueNoteRepository(prisma);
        const spy = vi.spyOn(prisma.goodsIssueNote, "findUnique");

        await noteRepository.getById(noteId);

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            where: { noteId: noteId.toString() },
            include: { purpose: true, lines: true },
        });
    });

    it("Deve recuperar a guia de saída pelo seu ID", async () => {
        const noteRepository = new PostgresGoodsIssueNoteRepository(prisma);

        const noteOrErr = await noteRepository.getById(ID.fromString("1"));

        const note = <GoodsIssueNote>noteOrErr.value;

        expect(note.noteId.toString()).toEqual("1");
        expect(note.status).toEqual("Por Devolver");
        expect(note.fulltext).toEqual("dummy dummy dummy");
    });

    it("Deve recuperar as linhas da guia de saída", async () => {
        const noteRepository = new PostgresGoodsIssueNoteRepository(prisma);

        const noteOrErr = await noteRepository.getById(ID.fromString("1"));

        const note = <GoodsIssueNote>noteOrErr.value;

        expect(note.lines.length).toEqual(1);
    });

    it("Deve recuperar as linhas da guia com as variações da linha", async () => {
        const noteRepository = new PostgresGoodsIssueNoteRepository(prisma);

        const noteOrErr = await noteRepository.getById(ID.fromString("1"));

        const note = <GoodsIssueNote>noteOrErr.value;

        expect(note.lines[0].variationsValues).toBeDefined();
        expect(note.lines[0].variationsValues).toEqual({ "1": "Cor: Azul", "2": "Tamanho: L" });
    });

    it("Deve retornar **GoodsIssueNoteNotFoundError** se a guia de saída não for encontrada", async () => {
        const prisma = {
            goodsIssueNote: { findUnique: async (_args: object) => null },
        } as PrismaClient;
        const noteRepository = new PostgresGoodsIssueNoteRepository(prisma);

        const noteOrErr = await noteRepository.getById(ID.fromString("1"));

        expect(noteOrErr.isLeft()).toBeTruthy();
        expect(noteOrErr.value).toBeInstanceOf(GoodsIssueNoteNotFound);
    });
});

const prisma = {
    goodsIssueNote: { findUnique: async (_args: object) => _notes[0] },
} as unknown as PrismaClient;

const _notes = [
    {
        noteId: "1",
        purpose: {
            description: "dummy",
            notes: "dummy",
            details: "dummy",
        },
        returnData: "01-01-2021T00:00:00",
        issuedAt: "01-01-2021T00:00:00",
        status: "Por Devolver",
        total: 0,
        securityDeposit: 0,
        securityDepositWithheld: 0,
        lines: [
            {
                lineId: ID.random().toString(),
                itemId: "1",
                name: "dummy",
                price: 0,
                fulltext: "dummy",
                goodQuantities: 1,
                badQuantities: 0,
                goodQuantitiesReturned: 0,
                badQuantitiesReturned: 0,
                comments: "dummy",
                variations: { "1": "Cor: Azul", "2": "Tamanho: L" },
            },
        ],
    },
];
