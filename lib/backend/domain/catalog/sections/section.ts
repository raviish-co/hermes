import type { ID } from "../../../shared/id";

export class Section {
    readonly sectionId: ID;
    readonly categoryId: ID;
    #name: string;

    constructor(sectionId: ID, name: string, categoryId: ID) {
        this.sectionId = sectionId;
        this.#name = name;
        this.categoryId = categoryId;
    }

    get name() {
        return this.#name;
    }
}
