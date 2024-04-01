import { InmemSectionRepository } from "../../persistense/inmem/inmem_section_repository";
import { Section } from "../../domain/catalog/sections/section";
import { ID } from "../../shared/id";

export class SectionRepositoryStub extends InmemSectionRepository {
    constructor() {
        super(_sectionsData.map((v) => new Section(v.id, v.name, v.categoryId)));
    }
}

const _sectionsData = [
    {
        id: ID.fromString("1"),
        name: "Sangue",
        categoryId: ID.fromString("3"),
    },
    {
        id: ID.fromString("2"),
        name: "Massa de molde",
        categoryId: ID.fromString("3"),
    },
    {
        id: ID.fromString("3"),
        name: "Algodão",
        categoryId: ID.fromString("3"),
    },
    {
        id: ID.fromString("4"),
        name: "Curita",
        categoryId: ID.fromString("3"),
    },
    {
        id: ID.fromString("5"),
        name: "Tesouras",
        categoryId: ID.fromString("1"),
    },
    {
        id: ID.fromString("6"),
        name: "Guardanapos",
        categoryId: ID.fromString("1"),
    },
    {
        id: ID.fromString("7"),
        name: "Toalhitas",
        categoryId: ID.fromString("1"),
    },
    {
        id: ID.fromString("8"),
        name: "Vaseline",
        categoryId: ID.fromString("1"),
    },
    {
        id: ID.fromString("9"),
        name: "Oléo de Pele",
        categoryId: ID.fromString("1"),
    },
    {
        id: ID.fromString("10"),
        name: "Álcool",
        categoryId: ID.fromString("1"),
    },
    {
        id: ID.fromString("11"),
        name: "Sabão neutro",
        categoryId: ID.fromString("1"),
    },
    {
        id: ID.fromString("12"),
        name: "Tapetes de lavar pincel",
        categoryId: ID.fromString("1"),
    },
    {
        id: ID.fromString("13"),
        name: "Cintos de makeup",
        categoryId: ID.fromString("1"),
    },
    {
        id: ID.fromString("14"),
        name: "Capa de proteção",
        categoryId: ID.fromString("1"),
    },
    {
        id: ID.fromString("15"),
        name: "Sombras",
        categoryId: ID.fromString("4"),
    },
    {
        id: ID.fromString("16"),
        name: "Glitter",
        categoryId: ID.fromString("4"),
    },
    {
        id: ID.fromString("17"),
        name: "Batons",
        categoryId: ID.fromString("9"),
    },
    {
        id: ID.fromString("18"),
        name: "Paletas",
        categoryId: ID.fromString("9"),
    },
    {
        id: ID.fromString("19"),
        name: "Lápis",
        categoryId: ID.fromString("9"),
    },
    {
        id: ID.fromString("20"),
        name: "Água micelar",
        categoryId: ID.fromString("7"),
    },
    {
        id: ID.fromString("21"),
        name: "Hidratantes",
        categoryId: ID.fromString("7"),
    },
    {
        id: ID.fromString("22"),
        name: "Leite de magnésia/Primers",
        categoryId: ID.fromString("7"),
    },
    {
        id: ID.fromString("23"),
        name: "Blindagens",
        categoryId: ID.fromString("7"),
    },
    {
        id: ID.fromString("24"),
        name: "Fixadores",
        categoryId: ID.fromString("7"),
    },
    {
        id: ID.fromString("25"),
        name: "Individuais",
        categoryId: ID.fromString("8"),
    },
    {
        id: ID.fromString("26"),
        name: "Paletas",
        categoryId: ID.fromString("8"),
    },
    {
        id: ID.fromString("27"),
        name: "Camisas",
        categoryId: ID.fromString("10"),
    },
    {
        id: ID.fromString("28"),
        name: "Calças",
        categoryId: ID.fromString("10"),
    },
    {
        id: ID.fromString("29"),
        name: "Saias",
        categoryId: ID.fromString("10"),
    },
    {
        id: ID.fromString("30"),
        name: "Vestidos",
        categoryId: ID.fromString("10"),
    },
    {
        id: ID.fromString("31"),
        name: "Blusas",
        categoryId: ID.fromString("10"),
    },
    {
        id: ID.fromString("32"),
        name: "Jaquetas",
        categoryId: ID.fromString("10"),
    },
];
