import { RequestRepository } from "../../domain/requests/request_repository";
import { Request } from "../../domain/requests/request";
import { ID } from "../../shared/id";

export class InmemRequestRepository implements RequestRepository {
    #data: Record<string, Request> = {};

    save(request: Request): Promise<void> {
        this.#data[request.requestId.toString()] = request;
        return Promise.resolve(undefined);
    }

    get(requestId: ID): Promise<Request> {
        const request = this.#data[requestId.toString()];
        return Promise.resolve(request);
    }

    last(): Promise<Request> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    get records(): Request[] {
        return Object.values(this.#data);
    }
}
