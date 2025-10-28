import { FixedUserRepository } from "@backend/persistence/fixed/fixed_user_repository";
import { UserRepositoryStub } from "@backend/tests/stubs/user_repository_stub";

const repository =
    process.env.NODE_ENV === "development" ? new UserRepositoryStub() : new FixedUserRepository();

export const useUserRepository = () => repository;
