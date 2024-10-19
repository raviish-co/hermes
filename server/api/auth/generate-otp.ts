import { useAuthService } from "~/composables/useAuthService";
import { HttpStatus } from "../http_status";
import { UserNotFound } from "~/lib/backend/domain/auth/user_not_found";

const service = useAuthService();

export default defineEventHandler(async (event) => {
    const data = await readBody(event);

    try {
        const voidOrErr = await service.generateOtp(data.username);

        if (voidOrErr.value instanceof UserNotFound) {
            throw createError({
                statusCode: HttpStatus.NotFound,
                message: "Utilizador invalido"
            });
        }
    } catch (error) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            message: "Erro interno do servidor"
        });
    }

    return
});
