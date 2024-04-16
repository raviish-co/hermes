import type { CategoryRepository } from "../../domain/catalog/categories/category_repository";
import { CategoryNotFound } from "../../domain/catalog/categories/category_not_found_error";
import { type Either, left, right } from "../../shared/either";
import { Category } from "../../domain/catalog/categories/category";

export class InmemCategoryRepository implements CategoryRepository {
    #categories: Record<string, Category> = {};

    constructor(categories?: Category[]) {
        if (!categories) return;

        categories.forEach((category) => {
            this.#categories[category.categoryId.toString()] = category;
        });
    }
    getAll(): Promise<Category[]> {
        return Promise.resolve(this.records);
    }

    findByName(name: string): Promise<Either<CategoryNotFound, Category>> {
        const category = this.records.find((c) => c.name === name);

        if (!category) return Promise.resolve(left(new CategoryNotFound()));

        return Promise.resolve(right(category));
    }

    exists(name: string): Promise<boolean> {
        return Promise.resolve(this.records.some((c) => c.name === name));
    }

    save(category: Category): Promise<void> {
        this.#categories[category.categoryId.toString()] = category;
        return Promise.resolve(undefined);
    }

    last(): Promise<Category> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    get records(): Category[] {
        return Object.values(this.#categories);
    }
}
