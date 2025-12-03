import type { ID } from "../../../shared/id";

export class Section {
    readonly sectionId: ID;
    readonly departmentId: ID;
    #name: string;

    constructor(sectionId: ID, name: string, departmentId: ID) {
        this.sectionId = sectionId;
        this.#name = name;
        this.departmentId = departmentId;
    }

    get name() {
        return this.#name;
    }
}
