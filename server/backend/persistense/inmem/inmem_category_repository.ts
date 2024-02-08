import { CategoryNotFound } from "../../domain/catalog/category_not_found_error";
import { CategoryRepository } from "../../domain/catalog/category_repository";
import { Either, left, right } from "../../shared/either";
import { Category } from "../../domain/catalog/category";

export class InmemCategoryRepository implements CategoryRepository {
    #categories: Record<string, Category> = {};

    findByName(name: string): Promise<Either<CategoryNotFound, Category>> {
        const category = this.records.find((c) => c.name === name);

        if (!category) return Promise.resolve(left(new CategoryNotFound()));

        return Promise.resolve(right(category));
    }

    getAll(): Promise<Category[]> {
        return Promise.resolve(this.records);
    }

    save(category: Category): Promise<void> {
        this.#categories[category.name] = category;
        return Promise.resolve(undefined);
    }

    update(category: Category): Promise<void> {
        this.#categories[category.name] = category;
        return Promise.resolve(undefined);
    }

    get records(): Category[] {
        return Object.values(this.#categories);
    }
}
