import type { PrismaClient } from "@prisma/client";
import { describe, expect, it, vi } from "vitest";
import { GoodsReceiptNote } from "../../domain/goods_receipt/goods_receipt_note";
import { GoodsReceiptNoteLine } from "../../domain/goods_receipt/goods_receipt_note_line";
import { PostgresGoodsReceiptNoteRepository } from "../../persistence/postgres/postgres_goods_receipt_note_repository";
import { ID } from "../../shared/id";

describe("PostgresGoodsReceiptNoteRepository - save", () => {
    it("Deve salvar um guia de entrada no repositório", async () => {
        const noteRepository = new PostgresGoodsReceiptNoteRepository(prisma);
        const spy = vi.spyOn(prisma.goodsReceiptNote, "create");

        await noteRepository.save(note);

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            data: {
                noteId: note.noteId.toString(),
                entryDate: note.entryDate,
                lines: {
                    createMany: {
                        data: noteLines.map((line) => ({
                            lineId: line.lineId.toString(),
                            productId: line.itemId.toString(),
                            goodQuantities: line.goodQuantities,
                            badQuantities: line.badQuantities,
                            comments: line.condition.comment,
                        })),
                    },
                },
            },
        });
    });

    it("Deve salvar a guia de entrada com os artigos que entraram armazém", async () => {
        const noteRepository = new PostgresGoodsReceiptNoteRepository(prisma);
        const spy = vi.spyOn(prisma.goodsReceiptNote, "create");

        await noteRepository.save(note);

        expect(spy).toHaveBeenCalledWith({
            data: {
                noteId: note.noteId.toString(),
                entryDate: note.entryDate,
                lines: {
                    createMany: {
                        data: noteLines.map((line) => ({
                            lineId: line.lineId.toString(),
                            productId: line.itemId.toString(),
                            goodQuantities: line.goodQuantities,
                            badQuantities: line.badQuantities,
                            comments: line.condition.comment,
                        })),
                    },
                },
            },
        });
    });

    it("Deve salvar a guia de entrada com a quantidade dos artigos em mau estado que entraram armazém", async () => {
        const noteRepository = new PostgresGoodsReceiptNoteRepository(prisma);
        const spy = vi.spyOn(prisma.goodsReceiptNote, "create");

        await noteRepository.save(note);

        expect(spy).toHaveBeenCalledWith({
            data: {
                noteId: note.noteId.toString(),
                entryDate: note.entryDate,
                lines: {
                    createMany: {
                        data: noteLines.map((line) => ({
                            lineId: line.lineId.toString(),
                            productId: line.itemId.toString(),
                            goodQuantities: line.goodQuantities,
                            badQuantities: line.badQuantities,
                            comments: line.condition.comment,
                        })),
                    },
                },
            },
        });
    });

    it("Deve salvar a guia de entrada com o comentário do utilizador que registou a entrada", async () => {
        const noteRepository = new PostgresGoodsReceiptNoteRepository(prisma);
        const spy = vi.spyOn(prisma.goodsReceiptNote, "create");

        await noteRepository.save(note);

        expect(spy).toHaveBeenCalledWith({
            data: {
                noteId: note.noteId.toString(),
                entryDate: note.entryDate,
                lines: {
                    createMany: {
                        data: noteLines.map((line) => ({
                            lineId: line.lineId.toString(),
                            productId: line.itemId.toString(),
                            goodQuantities: line.goodQuantities,
                            badQuantities: line.badQuantities,
                            comments: line.condition.comment,
                        })),
                    },
                },
            },
        });
    });
});

describe("PostgresGoodsReceiptNoteRepository - getAll", () => {
    it("Deve encontrar as guias de entrada no repositório", async () => {
        const noteRepository = new PostgresGoodsReceiptNoteRepository(prisma);
        const spy = vi.spyOn(prisma.goodsReceiptNote, "findMany");

        await noteRepository.getAll();

        expect(spy).toBeCalled();
        expect(spy).toBeCalledTimes(1);
        expect(spy).toBeCalledWith({
            include: {
                lines: true,
            },
        });
    });

    it("Deve retornar as guias de entrada encontradas no repositório", async () => {
        const noteRepository = new PostgresGoodsReceiptNoteRepository(prisma);

        const notes = await noteRepository.getAll();

        expect(notes.length).toBe(2);
    });
});

const noteLines: GoodsReceiptNoteLine[] = [
    new GoodsReceiptNoteLine(ID.random(), 1),
    new GoodsReceiptNoteLine(ID.random(), 10),
    new GoodsReceiptNoteLine(ID.random(), 10, 5, "Comentário"),
];
const note = new GoodsReceiptNote(ID.random(), new Date(), noteLines);
const _notes = [
    {
        noteId: "1",
        entryDate: "2021-09-01T00:00:00.000Z",
        lines: [
            {
                lineId: "1",
                productId: "1",
                goodQuantities: 1,
                badQuantities: 0,
                comments: "",
            },
        ],
    },
    {
        noteId: "2",
        entryDate: "2021-09-02T00:00:00.000Z",
        lines: [
            {
                lineId: "2",
                productId: "1",
                goodQuantities: 18,
                badQuantities: 5,
                comments: "Comentário",
            },
        ],
    },
];
const prisma = {
    goodsReceiptNote: {
        create: async (_args: object) => ({}),
        findMany: async (_args: object) => _notes,
    },
} as unknown as PrismaClient;
