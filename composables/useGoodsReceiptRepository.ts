import { InmemGoodsReceiptNoteRepository } from "~/lib/backend/persistense/inmem/inmem_goods_receipt_note_repository";
import { PostgresGoodsReceiptNoteRepository } from "~/lib/backend/persistense/postgres/postgres_goods_receipt_note_repository";
import { usePrismaClient } from "./usePrismaClient";

const repository =
    process.env.NODE_ENV === "development"
        ? new InmemGoodsReceiptNoteRepository()
        : new PostgresGoodsReceiptNoteRepository(usePrismaClient());

export const useGoodsReceiptRepository = () => repository;
