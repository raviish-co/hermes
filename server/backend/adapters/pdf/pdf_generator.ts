import type { Either } from "../../shared/either";
import { PdfGenerationError } from "./pdf_generator_error";

export interface NoteData {
    noteId: string;
    purpose: {
        description: string;
        details?: string;
        notes: string;
    };
    userId: string;
    dateIssue: string;
    dateReturn: string;
    total: string;
    securityDeposit: string;
    lines: Array<{
        itemId: string;
        name: string;
        goodQuantities: number;
        badQuantities?: number;
        price: string;
        totalQuantities: number;
        netTotal: string;
    }>;
    destination: {
        name: string;
        NIF: string;
        address: string;
    };
}

export interface PdfGenerator {
    generate(data: NoteData): Promise<Either<PdfGenerationError, File>>;
}
