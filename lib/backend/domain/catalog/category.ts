import { ID } from "../../shared/id";

export class Category {
    readonly categoryId: ID;
    readonly name: string;
    readonly variationsIds: ID[];

    private constructor(category: ID, name: string, variationsIds: ID[] = []) {
        this.categoryId = category;
        this.name = name;
        this.variationsIds = [...variationsIds];
    }

    static create(name: string, variationsIds: ID[] = []): Category {
        const categoryId = ID.random();

        const category = new Category(categoryId, name, variationsIds);

        return category;
    }
}
