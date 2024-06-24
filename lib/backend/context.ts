import { PrismaClient } from "@prisma/client";
import { SequenceGenerator } from "./adapters/sequences/sequence_generator";
import { Enviroment } from "./env";
import { InmemGoodsIssueNoteRepository } from "./persistense/inmem/inmem_goods_issue_note_repository";
import { InmemGoodsReceiptNoteRepository } from "./persistense/inmem/inmem_goods_receipt_note_repository";
import { InmemGoodsReturnNoteRepository } from "./persistense/inmem/inmem_goods_return_note_repository";
import { InmemSequenceStorage } from "./persistense/inmem/inmem_sequence_storage";
import { PostgresCategoryRepository } from "./persistense/postgres/postgres_category_repository";
import { PostgresGoodsIssueNoteRepository } from "./persistense/postgres/postgres_goods_issue_note_repository";
import { PostgresGoodsReceiptNoteRepository } from "./persistense/postgres/postgres_goods_receipt_note_repository";
import { PostgresGoodsReturnNoteRepository } from "./persistense/postgres/postgres_goods_return_note_repository";
import { PostgresItemRepository } from "./persistense/postgres/postgres_item_repository";
import { PostgresItemStockRepository } from "./persistense/postgres/postgres_item_stock_repository";
import { PostgresSectionRepository } from "./persistense/postgres/postgres_section_repository";
import { PostgresSequenceGenerator } from "./persistense/postgres/postgres_sequence_generator";
import { CategoryRepositoryStub } from "./tests/stubs/category_repository_stub";
import { ItemRepositoryStub } from "./tests/stubs/item_repository_stub";
import { ItemStockRepositoryStub } from "./tests/stubs/item_stock_repository_stub";
import { SectionRepositoryStub } from "./tests/stubs/section_repository_stub";

export function create() {
    if (process.env.NODE_ENV === Enviroment.Development) {
        return devContext();
    }

    return productionContext();
}

function devContext() {
    const sequenceStorage = new InmemSequenceStorage();
    return {
        itemRepository: new ItemRepositoryStub(),
        goodsIssueRepository: new InmemGoodsIssueNoteRepository(),
        sequenceGenerator: new SequenceGenerator(sequenceStorage),
        categoryRepository: new CategoryRepositoryStub(),
        sectionRepository: new SectionRepositoryStub(),
        goodsReceiptRepository: new InmemGoodsReceiptNoteRepository(),
        goodsReturnRepository: new InmemGoodsReturnNoteRepository(),
        itemStockRepository: new ItemStockRepositoryStub(),
    };
}

function productionContext() {
    const runtimeConfig = useRuntimeConfig();
    const prisma = new PrismaClient({ datasourceUrl: runtimeConfig.public.databaseUrl });
    return {
        itemRepository: new PostgresItemRepository(prisma),
        goodsIssueRepository: new PostgresGoodsIssueNoteRepository(prisma),
        sequenceGenerator: new PostgresSequenceGenerator(prisma),
        categoryRepository: new PostgresCategoryRepository(prisma),
        sectionRepository: new PostgresSectionRepository(prisma),
        itemStockRepository: new PostgresItemStockRepository(prisma),
        goodsReceiptRepository: new PostgresGoodsReceiptNoteRepository(prisma),
        goodsReturnRepository: new PostgresGoodsReturnNoteRepository(prisma),
    };
}
