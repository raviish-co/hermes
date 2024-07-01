import { InmemSectionRepository } from "~/lib/backend/persistense/inmem/inmem_section_repository";
import { PostgresSectionRepository } from "~/lib/backend/persistense/postgres/postgres_section_repository";
import { usePrismaClient } from "./usePrismaClient";

const repository =
    process.env.NODE_ENV === "development"
        ? new InmemSectionRepository()
        : new PostgresSectionRepository(usePrismaClient());

export const useSectionRepository = () => repository;
