import { InmemGoodsIssueNoteRepository } from "~/lib/backend/persistense/inmem/inmem_goods_issue_note_repository";
import { PostgresGoodsIssueNoteRepository } from "~/lib/backend/persistense/postgres/postgres_goods_issue_note_repository";
import { usePrismaClient } from "./usePrismaClient";

const repository =
    process.env.NODE_ENV === "development"
        ? new InmemGoodsIssueNoteRepository()
        : new PostgresGoodsIssueNoteRepository(usePrismaClient());

export const useGoodsIssueRepository = () => repository;
