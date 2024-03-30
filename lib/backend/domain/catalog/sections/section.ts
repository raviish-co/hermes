import type { ID } from "../../../shared/id";

export class Section {
    readonly sectionId: ID;
    name: string;
    #departmentId: ID;

    constructor(sectionId: ID, name: string, departmentId: ID) {
        this.sectionId = sectionId;
        this.name = name;
        this.#departmentId = departmentId;
    }
}
