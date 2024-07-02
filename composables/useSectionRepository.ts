import { PostgresSectionRepository } from "~/lib/backend/persistence/postgres/postgres_section_repository";
import { SectionRepositoryStub } from "~/lib/backend/tests/stubs/section_repository_stub";
import { usePrismaClient } from "./usePrismaClient";

const repository =
    process.env.NODE_ENV === "development"
        ? new SectionRepositoryStub()
        : new PostgresSectionRepository(usePrismaClient());

export const useSectionRepository = () => repository;
