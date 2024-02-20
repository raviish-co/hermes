import type { Section } from "../../domain/catalog/section";
import { SectionNotFound } from "../../domain/catalog/section_not_found_error";
import type { SectionRepository } from "../../domain/catalog/section_repository";
import { type Either, left, right } from "../../shared/either";

export class InmemSectionRepository implements SectionRepository {
    #sections: Record<string, Section> = {};

    findByName(name: string): Promise<Either<SectionNotFound, Section>> {
        const section = this.records.find((s) => s.name === name);

        if (!section) return Promise.resolve(left(new SectionNotFound(name)));

        return Promise.resolve(right(section));
    }

    save(section: Section): Promise<void> {
        this.#sections[section.sectionId.toString()] = section;
        return Promise.resolve(undefined);
    }

    get records(): Section[] {
        return Object.values(this.#sections);
    }
}
