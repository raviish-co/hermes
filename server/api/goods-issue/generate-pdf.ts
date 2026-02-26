import { useGoodsIssueService } from "@app/composables/useGoodsIssueService";
import { checkAnonymousUser } from "../check_anonymous_user";
import { GoodsIssueNoteNotFound } from "~~/server/backend/domain/goods_issue/goods_issue_note_not_found_error";
import { HttpStatus } from "../http_status";
import { ValidationError } from "~~/server/backend/application/validation_error";

const service = useGoodsIssueService();

export default defineEventHandler(async (event) => {
    checkAnonymousUser(event);

    const { noteId, destinationName, destinationNIF, destinationAddress } = await readBody(event);

    const result = await service.generatePDF({
        noteId: noteId,
        destinationName: destinationName,
        destinationNIF: destinationNIF,
        destinationAddress: destinationAddress,
    });

    if (result.value instanceof GoodsIssueNoteNotFound) {
        throw createError({
            statusCode: HttpStatus.NotFound,
            statusMessage: "Guia de saída não encontrada",
        });
    }

    if (result instanceof ValidationError) {
        throw createError({
            statusCode: HttpStatus.BadRequest,
            statusMessage: result.message,
        });
    }

    if (result instanceof Error) {
        throw createError({
            statusCode: HttpStatus.ServerError,
            statusMessage: "Erro ao gerar PDF da guia de saída",
        });
    }

    setHeader(event, "Content-Type", "application/pdf");
    setHeader(event, "Content-Disposition", `attachment; filename="guia-de-saida-${noteId}.pdf"`);
    setResponseStatus(event, HttpStatus.OK);

    return result.value;
});
