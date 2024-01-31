import { RequestedItems } from "./requested_items";

export interface RequestRepository {
    save(requestItems: RequestedItems): Promise<void>;
    last(): Promise<RequestedItems>;
}
