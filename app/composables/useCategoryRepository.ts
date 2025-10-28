import { PostgresCategoryRepository } from "@backend/persistence/postgres/postgres_category_repository";
import { CategoryRepositoryStub } from "@backend/tests/stubs/category_repository_stub";
import { usePrismaClient } from "./usePrismaClient";

const repository =
    process.env.NODE_ENV === "development"
        ? new CategoryRepositoryStub()
        : new PostgresCategoryRepository(usePrismaClient());

export const useCategoryRepository = () => repository;
