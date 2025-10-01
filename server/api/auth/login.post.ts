import { useAuthService } from "~/composables/useAuthService";
import { AuthenticationFailed } from "~/lib/backend/domain/auth/authentication_failed_error";
import { HttpStatus } from "../http_status";

const service = useAuthService();

export default defineEventHandler(async (event) => {
    const data = await readBody(event);

    const userOrErr = await service.login(data.username, data.password);

    if (userOrErr.value instanceof AuthenticationFailed) {
        throw createError({ statusCode: HttpStatus.Unauthorized });
    }

    if (userOrErr.value instanceof Error) {
        throw createError({ statusCode: HttpStatus.ServerError });
    }

    setCookie(event, "raviish::access-token", userOrErr.value.accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        maxAge: 60 * 60 * 24,
        path: "/",
    });

    return { name: userOrErr.value.name, username: userOrErr.value.username };
});
