import { ItemService } from "./application/article_service";
import { RequestService } from "./application/request_service";
import { JsonPurposeSource } from "./persistense/data/json_purpouse_source";
import { InmemRequestRepository } from "./persistense/inmem/inmem_request_repository";
import { ItemRepositoryStub } from "./tests/stubs/item_repository_stub";
import { StockRepositoryStub } from "./tests/stubs/stock_repository_stub";

const jsonPurposeSource = new JsonPurposeSource();
const articleRepository = new ItemRepositoryStub();
const requestRepository = new InmemRequestRepository();
const stockRepository = new StockRepositoryStub();

export const makeRequestService = (): RequestService => {
    return new RequestService(
        jsonPurposeSource,
        articleRepository,
        requestRepository,
        stockRepository
    );
};

export const makeProductService = (): ItemService => {
    return new ItemService(articleRepository);
};
