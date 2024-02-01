import { ID } from "../../shared/id";
import { Request } from "./request";

export interface RequestRepository {
    save(requestItems: Request): Promise<void>;
    get(requestId: ID): Promise<Request>;
    last(): Promise<Request>;
}
