import { RequestRepository } from "../../domain/requests/request_repository";
import { RequestedItems } from "../../domain/requests/requested_items";

export class InmemRequestRepository implements RequestRepository {
    #data: Record<string, RequestedItems> = {};

    save(requestArticles: RequestedItems): Promise<void> {
        this.#data["1000"] = requestArticles;
        return Promise.resolve(undefined);
    }

    last(): Promise<RequestedItems> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    get records(): RequestedItems[] {
        return Object.values(this.#data);
    }
}
