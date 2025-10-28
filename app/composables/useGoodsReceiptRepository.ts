import { InmemGoodsReceiptNoteRepository } from "@backend/persistence/inmem/inmem_goods_receipt_note_repository";
import { PostgresGoodsReceiptNoteRepository } from "@backend/persistence/postgres/postgres_goods_receipt_note_repository";
import { usePrismaClient } from "./usePrismaClient";

const repository =
    process.env.NODE_ENV === "development"
        ? new InmemGoodsReceiptNoteRepository()
        : new PostgresGoodsReceiptNoteRepository(usePrismaClient());

export const useGoodsReceiptRepository = () => repository;
