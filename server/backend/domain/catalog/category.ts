import { ID } from "../../shared/id";

export class Category {
    readonly categoryId: ID;
    readonly name: string;

    private constructor(category: ID, name: string) {
        this.categoryId = category;
        this.name = name;
    }

    static create(name: string): Category {
        const categoryId = ID.RandomUUID();

        const category = new Category(categoryId, name);

        return category;
    }
}
