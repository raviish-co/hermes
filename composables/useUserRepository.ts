import { InmemUserRepository } from "~/lib/backend/persistence/inmem/inmem_user_repository";

const repository = new InmemUserRepository();

export const useUserRepository = () => repository;
