import { RequestService } from "./application/request_service";
import { PurposeSourceAdapter } from "./persistense/file_system/purpouse_source_adaoter";
import { InmemArticleRepository } from "./persistense/inmem/inmem_article_repository";
import { InmemRequestRepository } from "./persistense/inmem/inmem_request_repository";

const purposeSourceAdapter = new PurposeSourceAdapter();
const articleRepository = new InmemArticleRepository();
const requestRepository = new InmemRequestRepository();

export const makeRequestService = (): RequestService => {
    return new RequestService(purposeSourceAdapter, articleRepository, requestRepository);
};
