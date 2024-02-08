import { InmemCategoryRepository } from "./persistense/inmem/inmem_category_repository";
import { InmemRequestRepository } from "./persistense/inmem/inmem_request_repository";
import { InmemSequenceStorage } from "./persistense/inmem/inmem_sequence_storage";
import { JsonPurposeSource } from "./persistense/data/json_purpouse_source";
import { SequenceGenerator } from "./domain/sequences/sequence_generator";
import { ItemRepositoryStub } from "./tests/stubs/item_repository_stub";
import { RequestService } from "./application/request_service";
import { CatalogService } from "./application/catalog_service";

const jsonPurposeSource = new JsonPurposeSource();
const itemRepository = new ItemRepositoryStub();
const requestRepository = new InmemRequestRepository();
const sequenceStore = new InmemSequenceStorage();
const sequenceGenerator = new SequenceGenerator(sequenceStore);
const categoryRepository = new InmemCategoryRepository();

interface Services {
    requestService: RequestService;
    catalogService: CatalogService;
}

export const makeServices = (): Services => {
    const requestService = new RequestService(
        jsonPurposeSource,
        itemRepository,
        requestRepository,
        sequenceGenerator
    );

    const catalogService = new CatalogService(itemRepository, categoryRepository);

    return {
        requestService,
        catalogService,
    };
};
