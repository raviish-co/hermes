import { RequestRepository } from "../../domain/requests/request_repository";
import { RequestedArticles } from "../../domain/requests/requested_articles";

export class InmemRequestRepository implements RequestRepository {
    #data: Record<string, RequestedArticles> = {};

    save(requestArticles: RequestedArticles): Promise<void> {
        this.#data["1000"] = requestArticles;
        return Promise.resolve(undefined);
    }

    last(): Promise<RequestedArticles> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    get records(): RequestedArticles[] {
        return Object.values(this.#data);
    }
}
