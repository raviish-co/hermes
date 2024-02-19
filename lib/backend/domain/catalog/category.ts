import { ID } from "@backend/shared/id";

export class Category {
    readonly categoryId: ID;
    readonly name: string;

    private constructor(category: ID, name: string) {
        this.categoryId = category;
        this.name = name;
    }

    static create(name: string): Category {
        const categoryId = ID.random();

        const category = new Category(categoryId, name);

        return category;
    }
}
