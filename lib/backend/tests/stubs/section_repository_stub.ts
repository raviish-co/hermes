import { InmemSectionRepository } from "../../persistence/inmem/inmem_section_repository";
import { Section } from "../../domain/catalog/departments/section";
import { ID } from "../../shared/id";

export class SectionRepositoryStub extends InmemSectionRepository {
    constructor() {
        super(_sectionsData.map((v) => new Section(v.id, v.name, v.departmentId)));
    }
}

const _sectionsData = [
    {
        id: ID.fromString("1"),
        name: "T-shirts",
        departmentId: ID.fromString("1"),
    },
    {
        id: ID.fromString("2"),
        name: "Calçados",
        departmentId: ID.fromString("1"),
    },
];
