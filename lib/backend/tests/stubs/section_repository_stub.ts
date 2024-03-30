import { InmemSectionRepository } from "../../persistense/inmem/inmem_section_repository";
import { Section } from "../../domain/catalog/sections/section";
import { ID } from "../../shared/id";

export class SectionRepositoryStub extends InmemSectionRepository {
    constructor() {
        super(_sectionsData.map((v) => new Section(v.id, v.name, v.departmentId)));
    }
}

const _sectionsData = [
    {
        id: ID.fromString("1"),
        name: "Roupas",
        departmentId: ID.fromString("2"),
    },
    {
        id: ID.fromString("2"),
        name: "Batons",
        departmentId: ID.fromString("2"),
    },
    {
        id: ID.fromString("3"),
        name: "Sapatos",
        departmentId: ID.fromString("3"),
    },
];
