import { EventHandler, EventHandlerRequest } from "h3";
import { HttpStatus } from "../api/http_status";

export const defineSafeEventHandler = <T extends EventHandlerRequest, D>(
    handler: EventHandler<T, D>,
) => {
    return defineEventHandler<T>(async (event) => {
        try {
            return await handler(event);
        } catch (error: any) {
            if (isError(error) && error.statusCode) throw error;

            console.error(`[Server error] ${event.path}:`, error);

            throw createError({
                statusCode: error.statusCode ?? HttpStatus.ServerError,
                message: "Ocorreu um erro inesperado no servidor.",
                data: {
                    path: event.path,
                    timeStamp: new Date().toISOString(),
                },
            });
        }
    });
};
