import { SequenceGenerator } from "@backend/adapters/sequences/sequence_generator";
import { InmemSequenceStorage } from "@backend/persistence/inmem/inmem_sequence_storage";
import { PostgresSequenceGenerator } from "@backend/persistence/postgres/postgres_sequence_generator";
import { usePrismaClient } from "./usePrismaClient";

const repository =
    process.env.NODE_ENV === "development"
        ? new SequenceGenerator(new InmemSequenceStorage())
        : new PostgresSequenceGenerator(usePrismaClient());

export const useSequenceGenerator = () => repository;
