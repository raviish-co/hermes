import { PrismaClient } from "@prisma/client";
import { describe, expect, it, vi } from "vitest";
import { Section } from "../../domain/catalog/departments/section";
import { SectionNotFound } from "../../domain/catalog/departments/section_not_found_error";
import { PostgresSectionRepository } from "../../persistense/postgres/postgres_section_repository";
import { ID } from "../../shared/id";

describe("PostgresSectionRepository", () => {
    it("Deve salva uma secção no repositório", async () => {
        const prisma = {
            section: {
                create: async (_args: object) => {
                    return { section_id: "1", name: "T-shirts" };
                },
            },
        };

        const sectionRepository = new PostgresSectionRepository(prisma as PrismaClient);
        const section = new Section(ID.random(), "T-shirts", ID.random());
        const spy = vi.spyOn(prisma.section, "create");

        await sectionRepository.save(section);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({
            data: {
                section_id: section.sectionId.toString(),
                name: section.name,
            },
        });
    });

    it("Deve encontrar as secções do repositório", async () => {
        const prisma = { section: { findMany: async () => [] as any } };

        const sectionRepository = new PostgresSectionRepository(prisma as PrismaClient);
        const spy = vi.spyOn(prisma.section, "findMany");

        await sectionRepository.getAll();

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it("Deve recuperar as secções do repositório", async () => {
        const prisma = {
            section: {
                findMany: async () => {
                    return [{ section_id: "1", name: "T-shirts" }];
                },
            },
        };

        const sectionRepository = new PostgresSectionRepository(prisma as PrismaClient);

        const sections = await sectionRepository.getAll();

        expect(sections.length).toBe(1);
        expect(sections[0].name).toEqual("T-shirts");
        expect(sections[0].sectionId.toString()).toEqual("1");
    });

    it("Deve encontrar uma secção pelo nome", async () => {
        const prisma = {
            section: {
                findFirst: async () => {
                    return { section_id: "1", name: "T-shirts" };
                },
            },
        };
        const sectionRepository = new PostgresSectionRepository(prisma as PrismaClient);
        const spy = vi.spyOn(prisma.section, "findFirst");

        await sectionRepository.findByName("T-shirts");

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({
            where: { name: "T-shirts" },
        });
    });

    it("Deve recuperar uma secção pelo nome", async () => {
        const prisma = {
            section: {
                findFirst: async () => {
                    return { section_id: "1", name: "T-shirts" };
                },
            },
        };

        const sectionRepository = new PostgresSectionRepository(prisma as PrismaClient);

        const sectionOrErr = await sectionRepository.findByName("T-shirts");
        const section = <Section>sectionOrErr.value;

        expect(sectionOrErr.isRight()).toBe(true);
        expect(section.name).toEqual("T-shirts");
        expect(section.sectionId.toString()).toEqual("1");
    });

    it("Deve recuperar uma secção pelo nome", async () => {
        const prisma = { section: { findFirst: async () => null } };

        const sectionRepository = new PostgresSectionRepository(prisma as PrismaClient);

        const sectionOrErr = await sectionRepository.findByName("T-shirts");

        expect(sectionOrErr.isLeft()).toBe(true);
        expect(sectionOrErr.value).toBeInstanceOf(SectionNotFound);
    });

    it("Deve encontrar uma secção pelo ID", async () => {
        const prisma = { section: { findUnique: async (_args: object) => null } };

        const sectionRepository = new PostgresSectionRepository(prisma as PrismaClient);
        const spy = vi.spyOn(prisma.section, "findUnique");

        await sectionRepository.findById(ID.fromString("1"));

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({
            where: { section_id: "1" },
        });
    });

    it("Deve retornar **SectionNotFound** se a secção não existir no repositório", async () => {
        const prisma = { section: { findUnique: async (_args: object) => null } };

        const sectionRepository = new PostgresSectionRepository(prisma as PrismaClient);

        const sectionOrErr = await sectionRepository.findById(ID.random());

        expect(sectionOrErr.isLeft()).toBe(true);
        expect(sectionOrErr.value).toBeInstanceOf(SectionNotFound);
    });
});