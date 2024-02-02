import { InmemRequestRepository } from "./persistense/inmem/inmem_request_repository";
import { InmemSequenceStorage } from "./persistense/inmem/inmem_sequence_storage";
import { JsonPurposeSource } from "./persistense/data/json_purpouse_source";
import { SequenceGenerator } from "./domain/sequences/sequence_generator";
import { ItemRepositoryStub } from "./tests/stubs/item_repository_stub";
import { RequestService } from "./application/request_service";
import { ItemService } from "./application/item_service";

const jsonPurposeSource = new JsonPurposeSource();
const articleRepository = new ItemRepositoryStub();
const requestRepository = new InmemRequestRepository();
const sequenceStore = new InmemSequenceStorage();
const sequenceGenerator = new SequenceGenerator(sequenceStore);

export const makeRequestService = (): RequestService => {
    return new RequestService(
        jsonPurposeSource,
        articleRepository,
        requestRepository,
        sequenceGenerator
    );
};

export const makeItemService = (): ItemService => {
    return new ItemService(articleRepository);
};
