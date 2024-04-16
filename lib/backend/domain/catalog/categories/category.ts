import { ID } from "../../../shared/id";

export class Category {
    readonly categoryId: ID;
    name: string;
    variationsIds: ID[];
    description?: string;

    constructor(categoryId: ID, name: string, variationsIds: ID[] = [], description?: string) {
        this.categoryId = categoryId;
        this.name = name;
        this.variationsIds = [...variationsIds];
        this.description = description;
    }
}
