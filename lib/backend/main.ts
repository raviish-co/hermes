import { DefaultPurposeSpecification } from "./adapters/default_purpose_specification";
import { CsvReader } from "./adapters/readers/csv_reader";
import { SequenceGenerator } from "./adapters/sequences/sequence_generator";
import { CatalogService } from "./application/catalog_service";
import { DashboardService } from "./application/dashboard_service";
import { GoodsIssueService } from "./application/goods_issue_service";
import { GoodsReceiptService } from "./application/goods_receipt_service";
import { GoodsReturnService } from "./application/goods_return_service";
import { ImportService } from "./application/import_service";
import { PurposeService } from "./application/purpose_service";
import { WarehouseService } from "./application/warehouse_service";
import { InmemGoodsIssueNoteRepository } from "./persistense/inmem/inmem_goods_issue_note_repository";
import { InmemGoodsReceiptNoteRepository } from "./persistense/inmem/inmem_goods_receipt_note_repository";
import { InmemGoodsReturnNoteRepository } from "./persistense/inmem/inmem_goods_return_note_repository";
import { InmemSequenceStorage } from "./persistense/inmem/inmem_sequence_storage";
import { CategoryRepositoryStub } from "./tests/stubs/category_repository_stub";
import { ItemRepositoryStub } from "./tests/stubs/item_repository_stub";
import { ItemStockRepositoryStub } from "./tests/stubs/item_stock_repository_stub";
import { SectionRepositoryStub } from "./tests/stubs/section_repository_stub";
import { VariationRepositoryStub } from "./tests/stubs/variation_repository_stub";

const itemRepository = new ItemRepositoryStub();
const goodsIssueRepository = new InmemGoodsIssueNoteRepository();
const sequenceStorage = new InmemSequenceStorage();
const sequenceGenerator = new SequenceGenerator(sequenceStorage);
const categoryRepository = new CategoryRepositoryStub();
const csvReader = new CsvReader();
const variationRepository = new VariationRepositoryStub();
const sectionRepository = new SectionRepositoryStub();
const purposeSpec = new DefaultPurposeSpecification();
const goodsReturnRepository = new InmemGoodsReturnNoteRepository();
const goodsReceiptRepository = new InmemGoodsReceiptNoteRepository();
const itemStockRepository = new ItemStockRepositoryStub();

interface Services {
    goodsIssueService: GoodsIssueService;
    catalogService: CatalogService;
    importService: ImportService;
    purposeService: PurposeService;
    goodsReturnService: GoodsReturnService;
    goodsReceiptService: GoodsReceiptService;
    dashboardService: DashboardService;
    warehouseService: WarehouseService;
}

export const makeServices = (): Services => {
    const goodsIssueService = new GoodsIssueService(
        itemRepository,
        itemStockRepository,
        goodsIssueRepository,
        sequenceGenerator,
        purposeSpec
    );

    const catalogService = new CatalogService(
        itemRepository,
        itemStockRepository,
        variationRepository,
        categoryRepository,
        sectionRepository,
        sequenceGenerator
    );

    const importService = new ImportService(
        itemRepository,
        itemStockRepository,
        categoryRepository,
        sectionRepository,
        variationRepository,
        goodsReceiptRepository,
        sequenceGenerator,
        csvReader
    );

    const purposeService = new PurposeService();

    const goodsReturnService = new GoodsReturnService(
        goodsReturnRepository,
        goodsIssueRepository,
        itemRepository,
        itemStockRepository,
        sequenceGenerator
    );

    const goodsReceiptService = new GoodsReceiptService(
        itemRepository,
        itemStockRepository,
        goodsReceiptRepository,
        sequenceGenerator
    );

    const dashboardService = new DashboardService(
        goodsIssueRepository,
        itemRepository,
        itemStockRepository
    );

    const warehouseService = new WarehouseService(itemStockRepository);

    return {
        goodsIssueService,
        catalogService,
        importService,
        purposeService,
        goodsReturnService,
        goodsReceiptService,
        dashboardService,
        warehouseService,
    };
};
