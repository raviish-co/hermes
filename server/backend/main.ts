import { RequestService } from "./application/request_service";
import { PurposeSourceAdapter } from "./persistense/file_system/purpouse_source_adaoter";
import { InmemRequestRepository } from "./persistense/inmem/inmem_request_repository";
import { ArticleRepositoryStub } from "./tests/stubs/article_repository_stub";

const purposeSourceAdapter = new PurposeSourceAdapter();
const articleRepository = new ArticleRepositoryStub();
const requestRepository = new InmemRequestRepository();

export const makeRequestService = (): RequestService => {
    return new RequestService(purposeSourceAdapter, articleRepository, requestRepository);
};
