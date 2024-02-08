import { Either } from "../../shared/either";
import { Category } from "./category";
import { CategoryNotFound } from "./category_not_found_error";

export interface CategoryRepository {
    getAll(): Promise<Category[]>;
    findByName(name: string): Promise<Either<CategoryNotFound, Category>>;
    save(category: Category): Promise<void>;
    update(category: Category): Promise<void>;
}
