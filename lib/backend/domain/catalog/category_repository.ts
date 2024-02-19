import { CategoryNotFound } from "../../domain/catalog/category_not_found_error";
import { Category } from "../../domain/catalog/category";
import type { Either } from "../../shared/either";

export interface CategoryRepository {
    findByName(name: string): Promise<Either<CategoryNotFound, Category>>;
    save(category: Category): Promise<void>;
}
