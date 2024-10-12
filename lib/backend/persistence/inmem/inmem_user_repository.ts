import { User } from "../../domain/auth/user";
import { UserNotFound } from "../../domain/auth/user_not_found";
import type { UserRepository } from "../../domain/auth/user_repository";
import type { Username } from "../../domain/auth/username";
import { type Either, left, right } from "../../shared/either";

export class InmemUserRepository implements UserRepository {
    #users: Record<string, User> = {
        "john.doe": new User("john.doe", "josan5368", "John Doe"),
    };

    async getByUsername(
        username: Username,
    ): Promise<Either<UserNotFound, User>> {
        const user = this.#users[username.value];
        if (!user) return left(new UserNotFound());

        return right(user);
    }

    async save(user: User): Promise<void> {
        this.#users[user.username.value] = user;
    }
}
