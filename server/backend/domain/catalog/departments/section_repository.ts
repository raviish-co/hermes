import type { ID } from "~~/server/backend/shared/id";
import { type Either } from "../../../shared/either";
import { Section } from "./section";
import { SectionNotFound } from "./section_not_found_error";

export interface SectionRepository {
    getAll(): Promise<Section[]>;
    findById(sectionId: ID): Promise<Either<SectionNotFound, void>>;
    findByName(name: string): Promise<Either<SectionNotFound, Section>>;
    save(section: Section): Promise<void>;
}
