import { AuthService } from "~/lib/backend/application/auth_service";
import { useOtpStorage } from "./useOtpStorage";
import { useOtpSender } from "./useOtpSender";
import { useTokenGenerator } from "./useTokenGenerator";
import { useUserRepository } from "./useUserRepository";

const srv = new AuthService(
    useUserRepository(),
    useTokenGenerator(),
    useOtpStorage(),
    useOtpSender()
);

export const useAuthService = () => srv;
