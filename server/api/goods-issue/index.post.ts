import { useGoodsIssueService } from "@app/composables/useGoodsIssueService";
import { InsufficientStock } from "@backend/domain/catalog/items/insufficient_stock_error";
import { ItemNotFound } from "@backend/domain/catalog/items/item_not_found_error";
import { InvalidPurpose } from "@backend/domain/goods_issue/invalid_purpose_error";
import { InvalidTotal } from "@backend/domain/goods_issue/invalid_total_error";
import { HttpStatus } from "../http_status";
import { checkAnonymousUser } from "../check_anonymous_user";

const service = useGoodsIssueService();

export default defineEventHandler(async (event) => {
    checkAnonymousUser(event);

    const { data } = await readBody(event);

    const voidOrErr = await service.new(data);

    if (voidOrErr.value instanceof InvalidPurpose) {
        return new Response(
            JSON.stringify({
                message: "A finalidade informada é inválida",
            }),
            {
                status: HttpStatus.BadRequest,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
    }

    if (voidOrErr.value instanceof ItemNotFound) {
        return new Response(
            JSON.stringify({
                message: "Artigo não encontrado",
            }),
            {
                status: HttpStatus.NotFound,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
    }

    if (voidOrErr.value instanceof InvalidTotal) {
        return new Response(
            JSON.stringify({
                message: "Total da guia de saída inválido",
            }),
            {
                status: HttpStatus.BadRequest,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
    }

    if (voidOrErr.value instanceof InsufficientStock) {
        return new Response(
            JSON.stringify({
                message: "Stock insuficiente",
            }),
            {
                status: HttpStatus.BadRequest,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
    }

    if (voidOrErr instanceof Error) {
        return new Response(
            JSON.stringify({
                message: "Erro ao efetuar a saida de artigos",
            }),
            {
                status: HttpStatus.ServerError,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
    }

    setResponseStatus(event, HttpStatus.Created);

    return { message: "Saída de Artigos efetuada com sucesso" };
});
