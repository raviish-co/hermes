import { FixedUserRepository } from "~/lib/backend/persistence/fixed/fixed_user_repository";
import { UserRepositoryStub } from "~/lib/backend/tests/stubs/user_repository_stub";

const repository = process.env.NODE_ENV === "development"
    ? new UserRepositoryStub()
    : new FixedUserRepository();

export const useUserRepository = () => repository;
