import { ID } from "../../shared/id";

export class Category {
    readonly categoryId: ID;
    name: string;
    variationsIds: ID[];

    constructor(categoryId: ID, name: string, variationsIds: ID[] = []) {
        this.categoryId = categoryId;
        this.name = name;
        this.variationsIds = [...variationsIds];
    }
}
