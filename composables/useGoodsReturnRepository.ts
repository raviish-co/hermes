import { InmemGoodsReturnNoteRepository } from "~/lib/backend/persistence/inmem/inmem_goods_return_note_repository";
import { PostgresGoodsReturnNoteRepository } from "~/lib/backend/persistence/postgres/postgres_goods_return_note_repository";
import { usePrismaClient } from "./usePrismaClient";

const repository =
    process.env.NODE_ENV === "development"
        ? new InmemGoodsReturnNoteRepository()
        : new PostgresGoodsReturnNoteRepository(usePrismaClient());

export const useGoodsReturnRepository = () => repository;
