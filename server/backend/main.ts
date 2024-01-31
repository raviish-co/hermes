import { ArticleService } from "./application/article_service";
import { RequestService } from "./application/request_service";
import { JsonPurposeSource } from "./persistense/data/json_purpouse_source";
import { InmemRequestRepository } from "./persistense/inmem/inmem_request_repository";
import { ItemRepositoryStub } from "./tests/stubs/item_repository_stub";

const purposeSourceAdapter = new JsonPurposeSource();
const articleRepository = new ItemRepositoryStub();
const requestRepository = new InmemRequestRepository();

export const makeRequestService = (): RequestService => {
    return new RequestService(purposeSourceAdapter, articleRepository, requestRepository);
};

export const makeProductService = (): ArticleService => {
    return new ArticleService(articleRepository);
};
