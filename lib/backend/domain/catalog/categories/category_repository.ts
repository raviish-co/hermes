import { CategoryNotFound } from "../categories/category_not_found_error";
import type { Either } from "../../../shared/either";
import { Category } from "../categories/category";

export interface CategoryRepository {
    findByName(name: string): Promise<Either<CategoryNotFound, Category>>;
    save(category: Category): Promise<void>;
}
