// import { CategoryNotFound } from "../../domain/catalog/category_not_found_error";
// import { Category } from "../../domain/catalog/category";
import { SectionRepository } from "../../domain/catalog/section_repository";
import { Either, left, right } from "../../shared/either";
import { Section } from "../../domain/catalog/section";

export class InmemSectionRepository implements SectionRepository {
    #sections: Record<string, Section> = {};

    findByName(name: string): Promise<Either<Error, Section>> {
        const section = this.records.find((s) => s.name === name);

        if (!section) return Promise.resolve(left(new Error()));

        return Promise.resolve(right(section));
    }

    // getAll(): Promise<Category[]> {
    //     return Promise.resolve(this.records);
    // }

    // update(section: Section): Promise<void> {
    //     this.#sections[section.name] = section;
    //     return Promise.resolve(undefined);
    // }

    save(section: Section): Promise<void> {
        this.#sections[section.name] = section;
        return Promise.resolve(undefined);
    }

    get records(): Section[] {
        return Object.values(this.#sections);
    }
}
