import { useAuthService } from "~/composables/useAuthService";
import { ANONYMOUS_USER } from "../api/check_anonymous_user";

const service = useAuthService();

const TOKEN_HEADER = "X-Access-Token";

export default defineEventHandler(async (event) => {
    const token = getHeader(event, TOKEN_HEADER);

    if (!token) {
        event.context.username = ANONYMOUS_USER;
        return;
    }

    try {
        const validOrErr = await service.verifyToken(token);

        if (validOrErr.isLeft()) {
            event.context.username = ANONYMOUS_USER;
            return;
        }

        event.context.username = validOrErr.value.username;
    } catch (err) {
        event.context.username = ANONYMOUS_USER;
        return;
    }
});
