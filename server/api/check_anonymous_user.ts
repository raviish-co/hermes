import { H3Event } from "h3";
import { HttpStatus } from "./http_status";

const EXEMPT_URLS = [
    "/api/purpose-specifications",
    "/api/variations"
]

export const ANONYMOUS_USER = "anonymous";

export function checkAnonymousUser(event: H3Event) {
    if (event.context.username === ANONYMOUS_USER && !EXEMPT_URLS.includes(event.path)) {
        throw createError({
            statusCode: HttpStatus.Unauthorized,
            message: "Erro ao tentar acessar recurso nao autorizado.",
        });
    }
}
