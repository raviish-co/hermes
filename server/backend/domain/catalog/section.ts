import { ID } from "../../shared/id";

export type Options = {
    name: string;
    department?: string;
};

export class Section {
    readonly sectionId: ID;
    readonly name: string;
    readonly department?: string;

    private constructor(sectionId: ID, name: string, department?: string) {
        this.sectionId = sectionId;
        this.name = name;
        this.department = department;
    }

    static create(options: Options) {
        const { name, department } = options;

        const newID = ID.RandomUUID();

        const section = new Section(newID, name, department);

        return section;
    }
}
