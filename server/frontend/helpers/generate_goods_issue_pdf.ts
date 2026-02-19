import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { GoodsIssueNote } from "../domain/goods_issue_note";
import type { GoodsIssueNoteClient } from "../domain/goods_issue_note_client";
import { formatDate } from "./format_date";

export function generateGoodsIssuePdf(note: GoodsIssueNote, client: GoodsIssueNoteClient) {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const leftMargin = 14;
    const rightMargin = pageWidth - 100;

    // Title
    doc.setFontSize(16);
    doc.text("Guia de Saída de Mercadorias", pageWidth / 2, 20, { align: "center" });

    // Company Info (Left)
    doc.setFontSize(14);
    doc.text("Raviish", leftMargin, 35);

    doc.setFontSize(10);
    doc.text("Cç Comandante Veneno", leftMargin, 41);
    doc.text("Edifício Fénix - 56Pm+3CP, Luanda", leftMargin, 46);
    doc.text("NIF: N/D", leftMargin, 51);
    doc.text("Email: raniaelawarstyling@gmail.com", leftMargin, 56);

    // Client Info (Right)
    doc.setFontSize(10);
    doc.text("Destinatário:", rightMargin, 35);
    doc.text(`Nome: ${client.name}`, rightMargin, 41);
    doc.text(`NIF: ${client.nif}`, rightMargin, 46);
    doc.text(`Endereço: ${client.address}`, rightMargin, 51);

    // Header Info
    doc.setFontSize(10);
    doc.text(`Guia nº ${note.goodsIssueNoteId}`, leftMargin, 70);
    doc.text(`Estado: ${note.status}`, leftMargin, 76);

    // Dates
    doc.text(`Data de Saída: ${formatDate(note.issueDate)}`, rightMargin, 70);
    doc.text(`Data de Devolução: ${formatDate(note.returnDate)}`, rightMargin, 76);

    // Purpose
    doc.text(`Finalidade: ${note.purpose.description}`, leftMargin, 85);
    if (note.purpose.details) {
        doc.text(`Detalhes: ${note.purpose.details}`, leftMargin, 91);
    }

    // Table
    const tableBody = note.lines.map((line) => [
        line.itemId,
        line.name,
        line.formattedVariationsValues || "-",
        line.quantityRequested.toString(),
        line.formattedPrice,
        line.formattedTotal,
    ]);

    autoTable(doc, {
        startY: 100,
        head: [["Código", "Artigo", "Variações", "Qtd", "Preço", "Total"]],
        body: tableBody,
        theme: "grid",
        styles: { fontSize: 9 },
        headStyles: { fillColor: [66, 66, 66] },
    });

    // Totals
    const finalY = (doc as any).lastAutoTable.finalY + 10;

    doc.text(`Total: ${note.formattedGrossTotal}`, rightMargin, finalY);
    doc.text(`Caução: ${note.formattedSecurityDeposit}`, rightMargin, finalY + 6);

    // Signatures
    const pageHeight = doc.internal.pageSize.height;
    const signatureY = pageHeight - 40;

    doc.line(leftMargin, signatureY, 90, signatureY); // Left line
    doc.text("Responsável", 52, signatureY + 5, { align: "center" });

    doc.line(120, signatureY, 196, signatureY); // Right line
    doc.text("Cliente", 158, signatureY + 5, { align: "center" });

    // Save
    doc.save(`guia_saida_${note.goodsIssueNoteId}.pdf`);
}
