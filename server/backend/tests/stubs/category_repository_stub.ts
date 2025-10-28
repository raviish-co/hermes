import { InmemCategoryRepository } from "../../persistence/inmem/inmem_category_repository";
import { Category } from "../../domain/catalog/categories/category";
import { ID } from "../../shared/id";

export class CategoryRepositoryStub extends InmemCategoryRepository {
    constructor() {
        super(_categoriesData.map((c) => new Category(c.id, c.name, c.variationsIds)));
    }
}

export const _categoriesData = [
    {
        id: ID.fromString("1"),
        name: "Camisas",
        variationsIds: [ID.fromString("1"), ID.fromString("2")],
    },
    {
        id: ID.fromString("2"),
        name: "Sapatos",
        variationsIds: [ID.fromString("1"), ID.fromString("2")],
    },
    {
        id: ID.fromString("3"),
        name: "Casacos",
        variationsIds: [ID.fromString("1"), ID.fromString("2"), ID.fromString("5")],
    },
    {
        id: ID.fromString("4"),
        name: "Calças",
        variationsIds: [ID.fromString("1"), ID.fromString("2")],
    },
    {
        id: ID.fromString("5"),
        name: "Vestidos",
        variationsIds: [ID.fromString("1"), ID.fromString("2")],
    },
    {
        id: ID.fromString("6"),
        name: "Saias",
    },
    {
        id: ID.fromString("7"),
        name: "Calções",
        variationsIds: [ID.fromString("1"), ID.fromString("2")],
    },
];
