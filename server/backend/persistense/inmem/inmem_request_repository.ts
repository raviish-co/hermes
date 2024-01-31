import { RequestRepository } from "../../domain/requests/request_repository";
import { Request } from "../../domain/requests/request";

export class InmemRequestRepository implements RequestRepository {
    #data: Record<string, Request> = {};

    save(requestArticles: Request): Promise<void> {
        this.#data["1000"] = requestArticles;
        return Promise.resolve(undefined);
    }

    last(): Promise<Request> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    get records(): Request[] {
        return Object.values(this.#data);
    }
}
