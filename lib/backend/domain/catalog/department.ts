import { ID } from "../../shared/id";

class Department {
    readonly id: ID;
    #name: string;

    constructor(id: ID, name: string) {
        this.id = id;
        this.#name = name;
    }
}
