import { Either, left, right } from "~~/server/backend/shared/either";
import type { GoodsIssueNote } from "../domain/goods_issue_note";
import type { GoodsIssueNoteLine } from "../domain/goods_issue_note_line";
import type { GoodsIssueNoteModel } from "../models/goods_issue_note";

import { useAuth } from "@app/composables/useAuth";

const auth = useAuth();

export class GoodsIssueService {
    async new(note: GoodsIssueNote): Promise<Either<Error, { message: string }>> {
        try {
            const data = await this.#toNoteDTO(note);

            const response = await $fetch("/api/goods-issue", {
                method: "post",
                headers: await this.#headers(),
                body: JSON.stringify(data),
            });

            return right(response);
        } catch (error: any) {
            console.error("Erro ao criar a guia de saída:", error);

            const message =
                error.data?.message ?? "Erro ao criar a guia de saída. Tente novamente mais tarde.";

            return left(new Error(message));
        }
    }

    async getById(noteId: string): Promise<Either<Error, GoodsIssueNoteModel>> {
        try {
            const response = await $fetch<{ data: GoodsIssueNoteModel }>(
                `/api/goods-issue/${noteId}`,
                {
                    method: "get",
                    headers: await this.#headers(),
                },
            );

            return right(this.#toGoodsIssueNoteModel(response.data));
        } catch (error: any) {
            console.error("Erro ao buscar a guia de saída:", error);

            const message =
                error.data?.message ??
                "Erro ao buscar a guia de saída. Tente novamente mais tarde.";

            return left(new Error(message));
        }
    }

    async list(
        pageToken = 1,
        perPage = 12,
    ): Promise<{ notes: GoodsIssueNoteModel[]; total: number }> {
        const response = await $fetch("/api/goods-issue/", {
            method: "get",
            query: {
                pageToken,
                perPage,
            },
            headers: await this.#headers(),
        });

        const notes = response.notes.map(this.#toGoodsIssueNoteModel);

        return { notes, total: response.total };
    }

    async search(query: string): Promise<GoodsIssueNoteModel[]> {
        const notes = await $fetch("/api/goods-issue/search/", {
            method: "get",
            query: { query },
            headers: await this.#headers(),
        });
        return notes.map(this.#toGoodsIssueNoteModel);
    }

    async generatePDF(data: {
        noteId: string;
        destinationName: string;
        destinationNIF: string;
        destinationAddress: string;
    }): Promise<Either<Error, Blob>> {
        try {
            const response = await fetch("/api/goods-issue/generate-pdf", {
                method: "post",
                headers: await this.#headers(),
                body: JSON.stringify({
                    noteId: data.noteId,
                    destinationName: data.destinationName,
                    destinationNIF: data.destinationNIF,
                    destinationAddress: data.destinationAddress,
                }),
            });

            if (!response.ok) {
                const body = await response.json();
                console.error(body.message);
                return left(new Error(body.message));
            }

            return right(await response.blob());
        } catch (error) {
            console.error("Erro ao gerar o PDF da guia de saída:", error);
            return left(new Error("Erro ao gerar o PDF da guia de saída"));
        }
    }

    #toNoteLine(line: GoodsIssueNoteLine): LineDTO {
        return {
            itemId: line.itemId,
            goodQuantities: line.goodQuantities,
            badQuantities: line.badQuantities,
            comment: line.condition?.comment,
        };
    }

    async #toNoteDTO(note: GoodsIssueNote): Promise<NoteDTO> {
        return {
            total: note.grossTotal,
            returnDate: note.returnDate,
            purpose: note.purpose,
            lines: note.lines.map(this.#toNoteLine),
            userId: await auth.getUsername(),
        };
    }

    #toGoodsIssueNoteModel(data: any) {
        return {
            goodsIssueNoteId: data.goodsIssueNoteId,
            purpose: {
                description: data.purpose.description,
                details: data.purpose.details,
                notes: data.purpose.notes,
            },
            returnDate: data.returnDate,
            issueDate: data.issueDate,
            status: data.status,
            securityDeposit: data.securityDeposit,
            total: data.total,
            lines: data.lines,
        };
    }

    async #headers() {
        return {
            "Content-Type": "application/json",
            "X-Access-Token": await auth.getAccessToken(),
        };
    }
}

interface LineDTO {
    itemId: string;
    goodQuantities: number;
    badQuantities?: number;
    comment?: string;
}

interface NoteDTO {
    total: number;
    returnDate: string;
    lines: LineDTO[];
    userId: string;
    purpose: {
        description: string;
        details?: string;
        notes: string;
    };
}
