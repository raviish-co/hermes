import { SectionNotFound } from "./section_not_found_error";
import { type Either } from "../../../shared/either";
import { Section } from "./section";
import type { ID } from "~/lib/backend/shared/id";

export interface SectionRepository {
    getAll(): Promise<Section[]>;
    findById(sectionId: ID): Promise<Either<SectionNotFound, void>>;
    findByName(name: string): Promise<Either<SectionNotFound, Section>>;
    save(section: Section): Promise<void>;
}
