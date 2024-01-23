import { RequestedArticles } from "./requested_articles";

export interface RequestRepository {
    save(requestArticles: RequestedArticles): Promise<void>;
    last(): Promise<RequestedArticles>;
}
