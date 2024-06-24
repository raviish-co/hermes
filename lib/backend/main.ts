import { DefaultPurposeSpecification } from "./adapters/default_purpose_specification";
import { CsvReader } from "./adapters/readers/csv_reader";
import { CatalogService } from "./application/catalog_service";
import { DashboardService } from "./application/dashboard_service";
import { GoodsIssueService } from "./application/goods_issue_service";
import { GoodsReceiptService } from "./application/goods_receipt_service";
import { GoodsReturnService } from "./application/goods_return_service";
import { ImportService } from "./application/import_service";
import { PurposeService } from "./application/purpose_service";
import { WarehouseService } from "./application/warehouse_service";
import { create } from "./context";
import { VariationRepositoryStub } from "./tests/stubs/variation_repository_stub";

const csvReader = new CsvReader();
const variationRepository = new VariationRepositoryStub();
const purposeSpec = new DefaultPurposeSpecification();

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
    const ctx = create();

    const goodsIssueService = new GoodsIssueService(
        ctx.itemRepository,
        ctx.itemStockRepository,
        ctx.goodsIssueRepository,
        ctx.sequenceGenerator,
        purposeSpec
    );

    const catalogService = new CatalogService(
        ctx.itemRepository,
        ctx.itemStockRepository,
        variationRepository,
        ctx.categoryRepository,
        ctx.sectionRepository,
        ctx.sequenceGenerator
    );

    const importService = new ImportService(
        ctx.itemRepository,
        ctx.itemStockRepository,
        ctx.categoryRepository,
        ctx.sectionRepository,
        variationRepository,
        ctx.goodsReceiptRepository,
        ctx.sequenceGenerator,
        csvReader
    );

    const purposeService = new PurposeService();

    const goodsReturnService = new GoodsReturnService(
        ctx.goodsReturnRepository,
        ctx.goodsIssueRepository,
        ctx.itemRepository,
        ctx.itemStockRepository,
        ctx.sequenceGenerator
    );

    const goodsReceiptService = new GoodsReceiptService(
        ctx.itemRepository,
        ctx.itemStockRepository,
        ctx.goodsReceiptRepository,
        ctx.sequenceGenerator
    );

    const dashboardService = new DashboardService(
        ctx.goodsIssueRepository,
        ctx.itemRepository,
        ctx.itemStockRepository
    );

    const warehouseService = new WarehouseService(ctx.itemStockRepository);

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
