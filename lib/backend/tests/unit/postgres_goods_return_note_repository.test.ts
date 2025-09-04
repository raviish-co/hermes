import type { PrismaClient } from "@prisma/client";
import { describe, expect, it, vi } from "vitest";
import { GoodsReturnNote } from "../../domain/goods_return/goods_return_note";
import { GoodsReturnNoteLine } from "../../domain/goods_return/goods_return_note_line";
import { GoodsReturnNoteNotFound } from "../../domain/goods_return/goods_return_note_not_found_error";
import { PostgresGoodsReturnNoteRepository } from "../../persistence/postgres/postgres_goods_return_note_repository";
import { ID } from "../../shared/id";

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
        const prisma = {
            goodsReturnNote: { findUnique: async (_args: object) => null },
        };
        const noteId = ID.random();
        const noteRepository = new PostgresGoodsReturnNoteRepository(prisma as PrismaClient);

        const noteOrErr = await noteRepository.getById(noteId);

        expect(noteOrErr.isLeft()).toBeTruthy();
        expect(noteOrErr.value).toBeInstanceOf(GoodsReturnNoteNotFound);
    });

    it("Ao recuperar a nota deve incluir as linhas", async () => {
        const noteId = ID.fromString("1");
        const prisma = {
            goodsReturnNote: {
                findUnique: async (_args: object) => _notes[0],
                findMany: async (_args: object) => _notes,
                create: async (_args: object) => ({}),
            },
        } as unknown as PrismaClient;
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

        expect(note.lines[0].variationsValues).toEqual({
            "1": "Cor: Preta",
            "2": "Tamanho: P",
        });
        expect(note.lines[1].variationsValues).toEqual({
            "1": "Cor: Branca",
            "2": "Tamanho: M",
        });
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

describe("PostgresGoodsReturnNoteRepository - save", () => {
    it("Deve salvar a nota de devolução no repositório", async () => {
        const noteRepository = new PostgresGoodsReturnNoteRepository(prisma);
        const spy = vi.spyOn(prisma.goodsReturnNote, "create");

        await noteRepository.save(note);

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            data: {
                noteId: "1",
                goodsIssueNoteId: "1",
                securityDepositWithheld: 1000,
                issuedAt: note.issuedAt,
                userId: note.userId.toString(),
                lines: {
                    createMany: {
                        data: [
                            {
                                lineId: note.lines[0].lineId.toString(),
                                productId: "1",
                                description: "Item description",
                                goodQuantities: 1,
                                badQuantities: 0,
                                comments: "Comment",
                                variations: JSON.stringify({
                                    "1": "Cor: Preta",
                                    "2": "Tamanho: P",
                                }),
                            },
                        ],
                    },
                },
            },
        });
    });
});

const prisma = {
    goodsReturnNote: {
        findUnique: async (_args: object) => _notes[0],
        findMany: async (_args: object) => _notes,
        create: async (_args: object) => ({}),
    },
} as unknown as PrismaClient;

const note = new GoodsReturnNote(
    ID.fromString("1"),
    ID.fromString("1"),
    [
        new GoodsReturnNoteLine(
            ID.fromString("1"),
            "Item description",
            1,
            0,
            { "1": "Cor: Preta", "2": "Tamanho: P" },
            "Comment"
        ),
    ],
    1000,
    ID.fromString("userId"),
    new Date()
);

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
                variations: JSON.stringify({
                    "1": "Cor: Preta",
                    "2": "Tamanho: P",
                }),
            },
            {
                lineId: "2",
                productId: "2",
                description: "Item description",
                goodQuantities: 10,
                badQuantities: 1,
                variations: JSON.stringify({
                    "1": "Cor: Branca",
                    "2": "Tamanho: M",
                }),
                comments: "Comment",
            },
        ],
    },
];
