import { H3Event } from "h3";
import { HttpStatus } from "./http_status";

export const ANONYMOUS_USER = "anonymous";

export function checkAnonymousUser(event: H3Event) {
    if (event.context.username === ANONYMOUS_USER) {
        throw createError({
            statusCode: HttpStatus.Unauthorized,
            message: "Erro ao tentar acessar recurso nao autorizado.",
        });
    }
}
