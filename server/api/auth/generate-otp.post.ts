import { useAuthService } from "@app/composables/useAuthService";
import { HttpStatus } from "../http_status";
import { UserNotFound } from "@backend/domain/auth/user_not_found";

const service = useAuthService();

export default defineEventHandler(async (event) => {
    const data = await readBody(event);

    const voidOrErr = await service.generateOtp(data.username);

    if (voidOrErr.value instanceof UserNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            message: "Utilizador invalido",
        });
    }

    if (voidOrErr instanceof Error) {
        throw createError({ statusCode: HttpStatus.ServerError });
    }

    return;
});
