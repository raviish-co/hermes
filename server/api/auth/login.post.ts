import { useAuthService } from "~/composables/useAuthService";
import { AuthenticationFailed } from "~/lib/backend/domain/auth/authentication_failed_error";
import { HttpStatus } from "../http_status";

const service = useAuthService();

export default defineEventHandler(async (event) => {
    const data = await readBody(event);

    const tokenOrErr = await service.login(data.username, data.password);

    if (tokenOrErr.value instanceof AuthenticationFailed) {
        throw createError({ statusCode: HttpStatus.Unauthorized });
    }

    if (tokenOrErr.value instanceof Error) {
        throw createError({ statusCode: HttpStatus.ServerError });
    }

    return tokenOrErr.value;
});
