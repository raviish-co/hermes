import type { PrismaClient } from "@prisma/client";
import { describe, expect, it, vi } from "vitest";
import { PostgresSequenceGenerator } from "../../persistense/postgres/postgres_sequence_generator";

describe("PostgresSequenceGenerator - generate", () => {
    it("Deve gerar uma sequencia", async () => {
        const prisma = {
            sequence: {
                findUnique: async (_args: object) => null,
                create: async (_args: object) => ({}),
            },
        } as PrismaClient;
        const sequenceGenerator = new PostgresSequenceGenerator(prisma);

        const sequence = await sequenceGenerator.generate("XPTO");

        expect(sequence).toBe("XPTO - 0001");
    });

    it("Deve encontrar a ultima sequência gerada", async () => {
        const sequenceGenerator = new PostgresSequenceGenerator(prisma);
        const spy = vi.spyOn(prisma.sequence, "findUnique");

        await sequenceGenerator.generate("XPTO");

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ where: { name: "XPTO" } });
    });

    it("Com base na seguencia que foi encontrada deve gerar a próxima sequência", async () => {
        const sequenceGenerator = new PostgresSequenceGenerator(prisma);

        const sequence = await sequenceGenerator.generate("XPTO");

        expect(sequence).toBe("XPTO - 0002");
    });

    it("A sequencia a ser gerada deve ser salva", async () => {
        const sequenceGenerator = new PostgresSequenceGenerator(prisma);
        const spy = vi.spyOn(prisma.sequence, "update");

        await sequenceGenerator.generate("XPTO");

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ where: { name: "XPTO" }, data: { value: 2 } });
    });

    it("Se não existir uma sequência, deve gerar a sequência inicial", async () => {
        const prisma = {
            sequence: {
                findUnique: async (_args: object) => null,
                create: async (_args: object) => ({}),
            },
        } as PrismaClient;
        const sequenceGenerator = new PostgresSequenceGenerator(prisma);
        const spy = vi.spyOn(prisma.sequence, "create");

        const sequence = await sequenceGenerator.generate("XPTO");

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ data: { name: "XPTO", value: 1 } });
        expect(sequence).toBe("XPTO - 0001");
    });
});

const prisma = {
    sequence: {
        findUnique: async (_args: object) => _nextSequence,
        update: async (_args: object) => ({}),
    },
} as PrismaClient;

const _nextSequence = {
    name: "XPTO",
    value: 1,
};
