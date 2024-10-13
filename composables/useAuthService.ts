import { AuthService } from "~/lib/backend/application/auth_service";
import { useUserRepository } from "./useUserRepository";
import { useTokenGenerator } from "./useTokenGenerator";

const srv = new AuthService(
    useUserRepository(),
    useTokenGenerator(),
);

export const useAuthService = () => srv;
