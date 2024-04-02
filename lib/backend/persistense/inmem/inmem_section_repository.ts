import type { Section } from "../../domain/catalog/departments/section";
import { SectionNotFound } from "../../domain/catalog/departments/section_not_found_error";
import type { SectionRepository } from "../../domain/catalog/departments/section_repository";
import { type Either, left, right } from "../../shared/either";
import type { ID } from "../../shared/id";

export class InmemSectionRepository implements SectionRepository {
    #sections: Record<string, Section> = {};

    constructor(sections?: Section[]) {
        if (sections) {
            sections.forEach((section) => {
                this.#sections[section.sectionId.toString()] = section;
            });
        }
    }

    getAll(): Promise<Section[]> {
        return Promise.resolve(this.records);
    }

    findByName(name: string): Promise<Either<SectionNotFound, Section>> {
        const section = this.records.find((s) => s.name === name);

        if (!section) return Promise.resolve(left(new SectionNotFound(name)));

        return Promise.resolve(right(section));
    }

    findById(sectionId: ID): Promise<Either<SectionNotFound, void>> {
        const section = this.records.find((s) => s.sectionId.equals(sectionId));

        if (!section) return Promise.resolve(left(new SectionNotFound(sectionId.toString())));

        return Promise.resolve(right(undefined));
    }

    save(section: Section): Promise<void> {
        this.#sections[section.sectionId.toString()] = section;
        return Promise.resolve(undefined);
    }

    get records(): Section[] {
        return Object.values(this.#sections);
    }
}
