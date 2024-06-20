import { describe, expect, it, vi } from "vitest";
import type { GoodsReturnNote } from "../../domain/goods_return/goods_return_note";
import { PostgresGoodsReturnNoteRepository } from "../../persistense/postgres/postgres_goods_return_note_repository";
import { ID } from "../../shared/id";
import type { PrismaClient } from "@prisma/client";
import { GoodsReturnNoteNotFound } from "../../domain/goods_return/goods_return_note_not_found_error";

describe("PostgresGoodsReturnNoteRepository - getById", () => {
    it("Deve retonar uma nota pelo Id", async () => {
        const noteId = ID.fromString("1");
        const noteRepository = new PostgresGoodsReturnNoteRepository(prisma);

        const noteOrErr = await noteRepository.getById(noteId);

        const note = <GoodsReturnNote>noteOrErr.value;

        expect(note.noteId.equals(noteId)).toBeTruthy();
    });

    it("Deve encontrar a note pelo id no repositório", async () => {
        const noteId = ID.random();
        const noteRepository = new PostgresGoodsReturnNoteRepository(prisma);
        const spy = vi.spyOn(prisma.goodsReturnNote, "findUnique");

        await noteRepository.getById(noteId);

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            where: { noteId: noteId.toString() },
            include: { lines: true },
        });
    });

    it("Deve recuperar a nota encontrada o repositório", async () => {
        const noteId = ID.fromString("1");
        const noteRepository = new PostgresGoodsReturnNoteRepository(prisma);

        const noteOrErr = await noteRepository.getById(noteId);

        const note = <GoodsReturnNote>noteOrErr.value;

        expect(note.goodsIssueNoteId.toString()).toEqual("1");
        expect(note.securityDepositWithheld.value).toEqual(1000);
    });

    it("Deve retornar **GoodsReturnNoteFound**  se a nota não foi encontrada no repositório", async () => {
        const prisma = { goodsReturnNote: { findUnique: async (_args: object) => null } };
        const noteId = ID.random();
        const noteRepository = new PostgresGoodsReturnNoteRepository(prisma as PrismaClient);

        const noteOrErr = await noteRepository.getById(noteId);

        expect(noteOrErr.isLeft()).toBeTruthy();
        expect(noteOrErr.value).toBeInstanceOf(GoodsReturnNoteNotFound);
    });

    it("Ao recuperar a nota deve incluir as linhas", async () => {
        const noteId = ID.fromString("1");
        const noteRepository = new PostgresGoodsReturnNoteRepository(prisma);
        const spy = vi.spyOn(prisma.goodsReturnNote, "findUnique");

        const noteOrErr = await noteRepository.getById(noteId);

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            where: { noteId: noteId.toString() },
            include: { lines: true },
        });
    });

    it("A nota encontrada deve vir com as linhas", async () => {
        const noteId = ID.fromString("1");
        const noteRepository = new PostgresGoodsReturnNoteRepository(prisma);

        const noteOrErr = await noteRepository.getById(noteId);

        const note = <GoodsReturnNote>noteOrErr.value;

        expect(note.lines.length).toEqual(2);
        expect(note.lines[0].total).toEqual(1);
        expect(note.lines[1].total).toEqual(11);
    });

    it("Deve recuperar as variações referentes as linhas da nota", async () => {
        const noteId = ID.fromString("1");
        const noteRepository = new PostgresGoodsReturnNoteRepository(prisma);

        const noteOrErr = await noteRepository.getById(noteId);

        const note = <GoodsReturnNote>noteOrErr.value;

        expect(note.lines[0].variationsValues).toEqual({ "1": "Cor: Preta", "2": "Tamanho: P" });
        expect(note.lines[1].variationsValues).toEqual({ "1": "Cor: Branca", "2": "Tamanho: M" });
    });
});

describe("PostgresGoodsReturnNoteRepository - getAll", () => {
    it("Deve buscar as notas de devolução no repositório", async () => {
        const noteRepository = new PostgresGoodsReturnNoteRepository(prisma);
        const spy = vi.spyOn(prisma.goodsReturnNote, "findMany");

        await noteRepository.getAll();

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({ include: { lines: true } });
    });

    it("Deve recuperar as notas de devolução no repositório", async () => {
        const noteRepository = new PostgresGoodsReturnNoteRepository(prisma);

        const notes = await noteRepository.getAll();

        expect(notes.length).toEqual(1);
        expect(notes[0].lines.length).toEqual(2);
    });
});

const prisma = {
    goodsReturnNote: {
        findUnique: async (_args: object) => _notes[0],
        findMany: async (_args: object) => _notes,
    },
} as unknown as PrismaClient;

const _notes = [
    {
        noteId: "1",
        goodsIssueNoteId: "1",
        issuedAt: new Date(),
        securityDepositWithheld: 1000,
        lines: [
            {
                lineId: "1",
                productId: "1",
                description: "Item description",
                goodQuantities: 1,
                badQuantities: 0,
                comments: "Comment",
                variations: { "1": "Cor: Preta", "2": "Tamanho: P" },
            },
            {
                lineId: "2",
                productId: "2",
                description: "Item description",
                goodQuantities: 10,
                badQuantities: 1,
                variations: { "1": "Cor: Branca", "2": "Tamanho: M" },
                comments: "Comment",
            },
        ],
    },
];
