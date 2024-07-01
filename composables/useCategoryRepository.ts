import { InmemCategoryRepository } from "~/lib/backend/persistense/inmem/inmem_category_repository";
import { PostgresCategoryRepository } from "~/lib/backend/persistense/postgres/postgres_category_repository";
import { usePrismaClient } from "./usePrismaClient";

const repository =
    process.env.NODE_ENV === "development"
        ? new InmemCategoryRepository()
        : new PostgresCategoryRepository(usePrismaClient());

export const useCategoryRepository = () => repository;
