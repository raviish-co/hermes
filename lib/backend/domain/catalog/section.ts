import type { ID } from "../../shared/id";

export class Section {
    readonly id: ID;
    #name: string;
    #departmentId: ID;

    constructor(id: ID, name: string, departmentId: ID) {
        this.id = id;
        this.#name = name;
        this.#departmentId = departmentId;
    }
}
