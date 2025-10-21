import type { PrismaClient } from "@prisma/client";
import { Section } from "../../domain/catalog/departments/section";
import { SectionNotFound } from "../../domain/catalog/departments/section_not_found_error";
import type { SectionRepository } from "../../domain/catalog/departments/section_repository";
import { type Either, left, right } from "../../shared/either";
import { ID } from "../../shared/id";

function sectionFactory(sectionData: any): Section {
    return new Section(ID.fromString(sectionData.sectionId), sectionData.name, ID.random());
}

export class PostgresSectionRepository implements SectionRepository {
    constructor(private prisma: PrismaClient) {}

    async getAll(): Promise<Section[]> {
        const sectionsData = await this.prisma.section.findMany();

        if (!sectionsData) return [];

        return sectionsData.map(sectionFactory);
    }

    async findByName(name: string): Promise<Either<SectionNotFound, Section>> {
        const sectionData = await this.prisma.section.findFirst({
            where: { name: name },
        });

        if (!sectionData) return left(new SectionNotFound(name));

        return right(sectionFactory(sectionData));
    }

    async findById(sectionId: ID): Promise<Either<SectionNotFound, void>> {
        const sectionData = await this.prisma.section.findUnique({
            where: { sectionId: sectionId.toString() },
        });

        if (!sectionData) return left(new SectionNotFound(sectionId.toString()));

        return right(undefined);
    }

    async save(section: Section): Promise<void> {
        await this.prisma.section.create({
            data: {
                sectionId: section.sectionId.toString(),
                name: section.name,
            },
        });
    }
}
