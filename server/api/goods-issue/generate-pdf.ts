import { useGoodsIssueService } from "@app/composables/useGoodsIssueService";
import { checkAnonymousUser } from "../check_anonymous_user";
import { GoodsIssueNoteNotFound } from "~~/server/backend/domain/goods_issue/goods_issue_note_not_found_error";
import { HttpStatus } from "../http_status";
import { ValidationError } from "~~/server/backend/application/validation_error";

const service = useGoodsIssueService();

export default defineEventHandler(async (event) => {
    checkAnonymousUser(event);

    const body = await readBody(event);

    const result = await service.generatePDF({
        noteId: body.noteId,
        destinationName: body.destinationName,
        destinationNIF: body.destinationNIF,
        destinationAddress: body.destinationAddress,
    });

    if (result.value instanceof GoodsIssueNoteNotFound) {
        return new Response(
            JSON.stringify({
                message: "Guia de saída não encontrada",
            }),
            {
                status: HttpStatus.NotFound,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
    }

    if (result instanceof ValidationError) {
        return new Response(
            JSON.stringify({
                message: result.message,
            }),
            {
                status: HttpStatus.BadRequest,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
    }

    if (result instanceof Error) {
        return new Response(
            JSON.stringify({
                message: "Erro ao gerar PDF da guia de saída",
            }),
            {
                status: HttpStatus.ServerError,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
    }

    setHeader(event, "Content-Type", "application/pdf");
    setHeader(
        event,
        "Content-Disposition",
        `attachment; filename="guia-de-saida-${body.noteId}.pdf"`,
    );
    setResponseStatus(event, HttpStatus.OK);

    const file = <File>result.value;

    return file;
});
