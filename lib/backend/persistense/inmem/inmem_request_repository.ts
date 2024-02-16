import { GoodsIssueRepository } from "../../domain/requests/request_repository";
import { GoodsIssue } from "../../domain/requests/request";
import { ID } from "../../shared/id";

export class InmemRequestRepository implements GoodsIssueRepository {
    #requests: Record<string, GoodsIssue> = {};

    save(request: GoodsIssue): Promise<void> {
        this.#requests[request.requestId.toString()] = request;
        return Promise.resolve(undefined);
    }

    get(requestId: ID): Promise<GoodsIssue> {
        const request = this.#requests[requestId.toString()];
        return Promise.resolve(request);
    }

    last(): Promise<GoodsIssue> {
        return Promise.resolve(this.records[this.records.length - 1]);
    }

    get records(): GoodsIssue[] {
        return Object.values(this.#requests);
    }
}
