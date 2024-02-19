import { CategoryNotFound } from "@backend/domain/catalog/category_not_found_error";
import { Category } from "@backend/domain/catalog/category";
import type { Either } from "@backend/shared/either";

export interface CategoryRepository {
    findByName(name: string): Promise<Either<CategoryNotFound, Category>>;
    save(category: Category): Promise<void>;
}
