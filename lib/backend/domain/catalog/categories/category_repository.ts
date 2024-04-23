import type { ID } from "~/lib/backend/shared/id";
import type { Either } from "../../../shared/either";
import { Category } from "../categories/category";
import { CategoryNotFound } from "../categories/category_not_found_error";

export interface CategoryRepository {
    getById(categoryId: ID): Promise<Either<CategoryNotFound, Category>>;
    getAll(): Promise<Category[]>;
    findByName(name: string): Promise<Either<CategoryNotFound, Category>>;
    save(category: Category): Promise<void>;
    exists(name: string): Promise<boolean>;
    last(): Promise<Category>;
}
