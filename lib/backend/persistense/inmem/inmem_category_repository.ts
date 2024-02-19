import type { CategoryRepository } from "@backend/domain/catalog/category_repository";
import { CategoryNotFound } from "@backend/domain/catalog/category_not_found_error";
import { type Either, left, right } from "@backend/shared/either";
import { Category } from "@backend/domain/catalog/category";

export class InmemCategoryRepository implements CategoryRepository {
    #categories: Record<string, Category> = {};

    findByName(name: string): Promise<Either<CategoryNotFound, Category>> {
        const category = this.records.find((c) => c.name === name);

        if (!category) return Promise.resolve(left(new CategoryNotFound()));

        return Promise.resolve(right(category));
    }

    save(category: Category): Promise<void> {
        this.#categories[category.name] = category;
        return Promise.resolve(undefined);
    }

    get records(): Category[] {
        return Object.values(this.#categories);
    }
}
