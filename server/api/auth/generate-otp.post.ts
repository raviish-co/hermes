import { useAuthService } from "@app/composables/useAuthService";
import { HttpStatus } from "../http_status";
import { UserNotFound } from "@backend/domain/auth/user_not_found";

const service = useAuthService();

export default defineSafeEventHandler(async (event) => {
    const data = await readBody(event);

    const voidOrErr = await service.generateOtp(data.username);

    if (voidOrErr.value instanceof UserNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            message: "Utilizador não encontrado",
        });
    }

    if (voidOrErr instanceof Error) {
        throw createError({
            message: "Erro ao gerar o OTP",
            statusCode: HttpStatus.ServerError,
        });
    }

    return;
});
