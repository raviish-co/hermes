import { SequenceGenerator } from "~/lib/backend/adapters/sequences/sequence_generator";
import { InmemSequenceStorage } from "~/lib/backend/persistense/inmem/inmem_sequence_storage";
import { PostgresSequenceGenerator } from "~/lib/backend/persistense/postgres/postgres_sequence_generator";
import { usePrismaClient } from "./usePrismaClient";

const repository =
    process.env.NODE_ENV === "development"
        ? new SequenceGenerator(new InmemSequenceStorage())
        : new PostgresSequenceGenerator(usePrismaClient());

export const useSequenceGenerator = () => repository;
