import type { Either } from "../../shared/either";
import type { User } from "./user";
import type { UserNotFound } from "./user_not_found";
import type { Username } from "./username";

export interface UserRepository {
    getByUsername(username: Username): Promise<Either<UserNotFound, User>>;
    save(user: User): Promise<void>;
}
