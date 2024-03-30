import { SectionNotFound } from "./section_not_found_error";
import { type Either } from "../../../shared/either";
import { Section } from "./section";

export interface SectionRepository {
    findByName(name: string): Promise<Either<SectionNotFound, Section>>;
    save(section: Section): Promise<void>;
}
