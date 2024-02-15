// import { CategoryNotFound } from "./category_not_found_error";
import { Either } from "../../shared/either";
import { Section } from "./section";

export interface SectionRepository {
    // getAll(): Promise<Category[]>;
    // update(category: Category): Promise<void>;
    findByName(name: string): Promise<Either<Error, Section>>;
    save(section: Section): Promise<void>;
}
