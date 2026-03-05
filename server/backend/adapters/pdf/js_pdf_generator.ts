import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { left, right, type Either } from "../../shared/either";
import type { NoteData, PdfGenerator } from "./pdf_generator";
import { PdfGenerationError } from "./pdf_generator_error";

export class JsPdfGenerator implements PdfGenerator {
    private companyName = "Raviish";
    private companyStreet = "Cç Comandante Veneno";
    private companyBuilding = "Edifício Fénix - 56Pm+3CP, Luanda";
    private companyNIF = "124424242";
    private companyEmail = "raniaelawarstyling@gmail.com";

    async generate(data: NoteData): Promise<Either<PdfGenerationError, File>> {
        try {
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.width;
            const pageHeight = doc.internal.pageSize.height;
            const leftMargin = 14;
            const rightMargin = pageWidth - 100;
            let currentY = 15;

            // Title
            doc.setFontSize(16);
            doc.setFont("helvetica", "bold");
            doc.text("Guia de Saída de Mercadoria", pageWidth / 2, currentY, {
                align: "center",
            });
            currentY += 12;

            // Company Info (Left) and Destination Info (Right)
            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.text(this.companyName, leftMargin, currentY);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.text("DESTINATÁRIO:", rightMargin, currentY);

            currentY += 5;
            doc.setFontSize(10);
            doc.text(this.companyStreet, leftMargin, currentY);
            doc.text(`Nome: ${data.destination.name}`, rightMargin, currentY);

            currentY += 5;
            doc.text(this.companyBuilding, leftMargin, currentY);
            doc.text(`NIF: ${data.destination.NIF}`, rightMargin, currentY);

            currentY += 5;
            doc.text(`NIF: ${this.companyNIF}`, leftMargin, currentY);
            doc.text(`Endereço: ${data.destination.address}`, rightMargin, currentY);

            currentY += 5;
            doc.text(`Email: ${this.companyEmail}`, leftMargin, currentY);

            currentY += 10;

            // Header Info Row 1
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(`Guia nº ${data.noteId}`, leftMargin, currentY);
            doc.text(`Data de Saída: ${data.dateIssue}`, rightMargin, currentY);

            currentY += 5;
            doc.text(`Finalidade: ${data.purpose.description}`, leftMargin, currentY);
            doc.text(`Data de Devolução: ${data.dateReturn}`, rightMargin, currentY);

            currentY += 5;
            const details = data.purpose.details ? `${data.purpose.details}` : "N/A";
            doc.text(`Detalhes: ${details}`, leftMargin, currentY);

            currentY += 5;
            doc.text(`Responsável: ${data.purpose.notes}`, leftMargin, currentY);

            currentY += 10;

            // Table
            const tableBody = data.lines.map((line: NoteData["lines"][0]) => [
                line.itemId,
                line.name,
                line.totalQuantities.toString(),
                line.price,
                line.netTotal,
            ]);

            autoTable(doc, {
                startY: currentY,
                head: [["Código", "Artigo", "Qtd", "Preço", "Total"]],
                body: tableBody,
                theme: "grid",
                styles: {
                    fontSize: 9,
                    cellPadding: 3,
                },
                headStyles: {
                    fillColor: [66, 66, 66],
                    textColor: [255, 255, 255],
                    fontStyle: "bold",
                },
                alternateRowStyles: {
                    fillColor: [240, 240, 240],
                },
                margin: { left: leftMargin, right: 14 },
            });

            // Get the Y position after the table
            const finalY = (doc as any).lastAutoTable.finalY + 8;

            // Totals
            doc.setFontSize(10);
            doc.setFont("helvetica", "normal");
            doc.text(`Total: ${data.total}`, rightMargin, finalY);
            doc.text(`Caução: ${data.securityDeposit}`, rightMargin, finalY + 6);

            // Signature Section
            const signatureY = pageHeight - 35;

            doc.setLineWidth(0.5);
            doc.line(leftMargin, signatureY, 90, signatureY);
            doc.text("Responsável", 52, signatureY + 5, { align: "center" });

            doc.line(120, signatureY, 196, signatureY);
            doc.text("Cliente", 158, signatureY + 5, { align: "center" });

            const blob = doc.output("blob");

            const newFile = new File([blob], `guia_saida_${data.noteId}.pdf`, {
                type: "application/pdf",
                lastModified: Date.now(),
            });

            return right(newFile);
        } catch (error) {
            console.error("[JsPdfGenerator] Erro ao gerar PDF:", error);
            return left(
                new PdfGenerationError("Erro ao gerar o pdf da guia de saída", "JsPdfGenerator"),
            );
        }
    }
}
