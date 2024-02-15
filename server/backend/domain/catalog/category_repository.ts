import { CategoryNotFound } from "./category_not_found_error";
import { Either } from "../../shared/either";
import { Category } from "./category";

export interface CategoryRepository {
    findByName(name: string): Promise<Either<CategoryNotFound, Category>>;
    save(category: Category): Promise<void>;
}
