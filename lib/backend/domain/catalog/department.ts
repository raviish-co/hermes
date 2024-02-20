import { ID } from "../../shared/id";

export class Department {
    readonly id: ID;
    #name: string;

    constructor(id: ID, name: string) {
        this.id = id;
        this.#name = name;
    }
}
