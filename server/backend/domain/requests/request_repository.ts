import { Request } from "./request";

export interface RequestRepository {
    save(requestItems: Request): Promise<void>;
    last(): Promise<Request>;
}
