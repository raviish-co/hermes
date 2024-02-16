import { InmemCategoryRepository } from "./persistense/inmem/inmem_category_repository";
import { DefaultPurposeSpecification } from "./adapters/default_purpose_specification";
import { InmemRequestRepository } from "./persistense/inmem/inmem_request_repository";
import { VariationsRepositoryStub } from "./tests/stubs/variations_repository_stub";
import { InmemSequenceStorage } from "./persistense/inmem/inmem_sequence_storage";
import { SequenceGenerator } from "./domain/sequences/sequence_generator";
import { ItemRepositoryStub } from "./tests/stubs/item_repository_stub";
import { GoodsIssueService } from "./application/goods_issue_service";
import { CatalogService } from "./application/catalog_service";
import { ImportService } from "./application/import_service";
import { PurposeService } from "./application/purpose_service";

const itemRepository = new ItemRepositoryStub();
const requestRepository = new InmemRequestRepository();
const sequenceStore = new InmemSequenceStorage();
const sequenceGenerator = new SequenceGenerator(sequenceStore);
const categoryRepository = new InmemCategoryRepository();
const variationRepository = new VariationsRepositoryStub();

interface Services {
    requestService: GoodsIssueService;
    catalogService: CatalogService;
    importService: ImportService;
    purposeService: PurposeService;
}

export const makeServices = (): Services => {
    const requestService = new GoodsIssueService(
        itemRepository,
        requestRepository,
        sequenceGenerator,
        new DefaultPurposeSpecification()
    );

    const catalogService = new CatalogService(itemRepository, variationRepository);

    const importService = new ImportService(itemRepository, categoryRepository, sequenceGenerator);

    return {
        requestService,
        catalogService,
        importService,
        purposeService: new PurposeService(),
    };
};
