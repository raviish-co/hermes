import { InmemCategoryRepository } from "../../persistense/inmem/inmem_category_repository";
import { Category } from "../../domain/catalog/categories/category";
import { ID } from "../../shared/id";

export class CategoryRepositoryStub extends InmemCategoryRepository {
    constructor() {
        super(_categoriesData.map((v) => new Category(v.id, v.name, v.variationsIds)));
    }
}

const _categoriesData = [
    {
        id: ID.fromString("1"),
        name: "Diversos",
        variationsIds: [ID.fromString("1"), ID.fromString("2")],
    },
    {
        id: ID.fromString("2"),
        name: "Sapatos",
        variationsIds: [ID.fromString("1"), ID.fromString("2")],
    },
    {
        id: ID.fromString("3"),
        name: "Efeitos especiais",
    },
    {
        id: ID.fromString("4"),
        name: "Olhos",
    },
    {
        id: ID.fromString("7"),
        name: "Pele",
    },
    {
        id: ID.fromString("8"),
        name: "Corretivos",
    },
    {
        id: ID.fromString("9"),
        name: "Boca",
        variationsIds: [ID.fromString("1"), ID.fromString("3")],
    },
    {
        id: ID.fromString("10"),
        name: "Roupas",
        variationsIds: [
            ID.fromString("1"),
            ID.fromString("2"),
            ID.fromString("4"),
            ID.fromString("5"),
        ],
    },
];
