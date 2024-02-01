import { ID } from "../../shared/id";
import { Request } from "./request";

export interface RequestRepository {
    save(request: Request): Promise<void>;
    get(requestId: ID): Promise<Request>;
    last(): Promise<Request>;
}
