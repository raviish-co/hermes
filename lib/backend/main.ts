import { DefaultPurposeSpecification } from "./adapters/default_purpose_specification";
import { InmemGoodsIssueNoteRepository } from "./persistense/inmem/inmem_goods_issue_note_repository";
import { VariationRepositoryStub } from "./tests/stubs/variation_repository_stub";
import { InmemSequenceStorage } from "./persistense/inmem/inmem_sequence_storage";
import { SequenceGenerator } from "./adapters/sequences/sequence_generator";
import { ItemRepositoryStub } from "./tests/stubs/item_repository_stub";
import { GoodsIssueService } from "./application/goods_issue_service";
import { CatalogService } from "./application/catalog_service";
import { ImportService } from "./application/import_service";
import { PurposeService } from "./application/purpose_service";
import { SectionRepositoryStub } from "./tests/stubs/section_repository_stub";
import { InmemGoodsReturnNoteRepository } from "./persistense/inmem/inmem_goods_return_note_repository";
import { CategoryRepositoryStub } from "./tests/stubs/categoria_repository_stub";
import { GoodsReturnService } from "./application/goods_return_service";
import { GoodsReceiptService } from "./application/goods_receipt_service";
import { InmemGoodsReceiptNoteRepository } from "./persistense/inmem/inmem_goods_receipt_note_repository";

const itemRepository = new ItemRepositoryStub();
const goodsIssueRepository = new InmemGoodsIssueNoteRepository();
const sequenceStorage = new InmemSequenceStorage();
const sequenceGenerator = new SequenceGenerator(sequenceStorage);
const categoryRepository = new CategoryRepositoryStub();
const variationRepository = new VariationRepositoryStub();
const sectionRepository = new SectionRepositoryStub();
const purposeSpec = new DefaultPurposeSpecification();
const goodsReturnRepository = new InmemGoodsReturnNoteRepository();
const goodsReceiptRepository = new InmemGoodsReceiptNoteRepository();

interface Services {
    goodsIssueService: GoodsIssueService;
    catalogService: CatalogService;
    importService: ImportService;
    purposeService: PurposeService;
    goodsReturnService: GoodsReturnService;
    goodsReceiptService: GoodsReceiptService;
}

export const makeServices = (): Services => {
    const goodsIssueService = new GoodsIssueService(
        itemRepository,
        goodsIssueRepository,
        sequenceGenerator,
        purposeSpec
    );

    const catalogService = new CatalogService(
        itemRepository,
        variationRepository,
        categoryRepository,
        sectionRepository,
        sequenceGenerator
    );

    const importService = new ImportService(
        itemRepository,
        categoryRepository,
        sectionRepository,
        variationRepository,
        sequenceGenerator
    );

    const purposeService = new PurposeService();

    const goodsReturnService = new GoodsReturnService(
        goodsIssueRepository,
        itemRepository,
        goodsReturnRepository,
        sequenceGenerator
    );

    const goodsReceiptService = new GoodsReceiptService(
        itemRepository,
        goodsReceiptRepository,
        sequenceGenerator
    );

    return {
        goodsIssueService,
        catalogService,
        importService,
        purposeService,
        goodsReturnService,
        goodsReceiptService,
    };
};
