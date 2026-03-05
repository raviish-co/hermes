import { useAuth } from "@app/composables/useAuth";
import { Either, left, right } from "~~/server/backend/shared/either";

const auth = useAuth();

export class AuthService {
    async authenticate(username: string, password: string): Promise<Either<Error, void>> {
        try {
            const user = await $fetch("/api/auth/login/", {
                method: "post",
                body: { username, password },
            });

            auth.login(user);
            return right(undefined);
        } catch (error: any) {
            console.error("Erro ao autenticar-se:", error);

            const message =
                error.message ?? "Erro desconhecido ao autenticar-se. Tente novamente mais tarde.";

            return left(new Error(message));
        }
    }

    async generateOtp(username: string): Promise<Either<Error, void>> {
        try {
            await $fetch("/api/auth/generate-otp/", {
                method: "post",
                body: { username },
            });
            return right(undefined);
        } catch (error: any) {
            console.error("Erro ao gerar o OTP:", error);

            const message =
                error.message ?? "Erro desconhecido ao gerar o OTP. Tente novamente mais tarde.";

            return left(new Error(message));
        }
    }
}
