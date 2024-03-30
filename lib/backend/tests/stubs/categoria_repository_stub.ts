import { InmemCategoryRepository } from "../../persistense/inmem/inmem_category_repository";
import { Category } from "../../domain/catalog/categories/category";
import { ID } from "../../shared/id";

export class CategoryRepositoryStub extends InmemCategoryRepository {
    constructor() {
        super(_categoriesData.map((v) => new Category(v.id, v.name)));
    }
}

const _categoriesData = [
    {
        id: ID.fromString("1"),
        name: "Diversos",
        departmentId: ID.fromString("2"),
    },
    {
        id: ID.fromString("3"),
        name: "Sapatos",
        departmentId: ID.fromString("3"),
    },
];
