import { InmemCategoryRepository } from "./persistense/inmem/inmem_category_repository";
import { DefaultPurposeSpecification } from "./adapters/default_purpose_specification";
import { InmemGoodsIssueRepository } from "./persistense/inmem/inmem_goods_issue_repository";
import { VariationsRepositoryStub } from "./tests/stubs/variations_repository_stub";
import { InmemSequenceStorage } from "./persistense/inmem/inmem_sequence_storage";
import { SequenceGenerator } from "./domain/sequences/sequence_generator";
import { ItemCategoryRepositoryStub } from "./tests/stubs/item_repository_stub";
import { GoodsIssueService } from "./application/goods_issue_service";
import { CatalogService } from "./application/catalog_service";
import { ImportService } from "./application/import_service";
import { PurposeService } from "./application/purpose_service";

const itemRepository = new ItemCategoryRepositoryStub();
const goodsIssueRepository = new InmemGoodsIssueRepository();
const sequenceStorage = new InmemSequenceStorage();
const sequenceGenerator = new SequenceGenerator(sequenceStorage);
const categoryRepository = new InmemCategoryRepository();
const variationRepository = new VariationsRepositoryStub();
const purposeSpec = new DefaultPurposeSpecification();

interface Services {
    goodsIssueService: GoodsIssueService;
    catalogService: CatalogService;
    importService: ImportService;
    purposeService: PurposeService;
}

export const makeServices = (): Services => {
    const goodsIssueService = new GoodsIssueService(
        itemRepository,
        goodsIssueRepository,
        sequenceGenerator,
        purposeSpec
    );

    const catalogService = new CatalogService(itemRepository, variationRepository);

    const importService = new ImportService(itemRepository, categoryRepository, sequenceGenerator);

    const purposeService = new PurposeService();

    return {
        goodsIssueService,
        catalogService,
        importService,
        purposeService,
    };
};
