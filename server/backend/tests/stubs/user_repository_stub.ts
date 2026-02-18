import { User } from "../../domain/auth/user";
import { InmemUserRepository } from "../../persistence/inmem/inmem_user_repository";

export class UserRepositoryStub extends InmemUserRepository {
    constructor() {
        super([new User("john.doe@example.com", "password", "John Doe", "911001122")]);
    }
}
