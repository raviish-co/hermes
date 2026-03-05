import { useGoodsIssueService } from "@app/composables/useGoodsIssueService";
import { checkAnonymousUser } from "../check_anonymous_user";
import { GoodsIssueNoteNotFound } from "~~/server/backend/domain/goods_issue/goods_issue_note_not_found_error";
import { HttpStatus } from "../http_status";
import { ValidationError } from "~~/server/backend/application/validation_error";
import { defineSafeEventHandler } from "~~/server/utils/handler";

const service = useGoodsIssueService();

export default defineSafeEventHandler(async (event) => {
    checkAnonymousUser(event);

    const body = await readBody(event);

    const result = await service.generatePDF({
        noteId: body.noteId,
        destinationName: body.destinationName,
        destinationNIF: body.destinationNIF,
        destinationAddress: body.destinationAddress,
    });

    if (result.value instanceof GoodsIssueNoteNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            message: "Guia de saída não encontrada",
        });
    }

    if (result instanceof ValidationError) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            message: result.message,
        });
    }

    if (result instanceof Error) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            message: "Erro ao gerar PDF da guia de saída",
        });
    }

    const file = <File>result.value;

    setHeader(event, "Content-Type", "application/pdf");
    setHeader(
        event,
        "Content-Disposition",
        `attachment; filename="guia-de-saida-${body.noteId}.pdf"`,
    );
    setResponseStatus(event, HttpStatus.OK);

    return file;
});
