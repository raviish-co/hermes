import { right, type Either } from "../../shared/either";
import type { NoteData, PdfGenerator } from "./pdf_generator";
import { PdfGenerationError } from "./pdf_generator_error";

export class FakePdfGenerator implements PdfGenerator {
    async generate(data: NoteData): Promise<Either<PdfGenerationError, File>> {
        const items = data.lines
            .map(
                (line) => `
        <tr>
            <td>${line.itemId}</td>
            <td>${line.name}</td>
            <td>${line.totalQuantities}</td>
            <td>${line.price}</td>
            <td>${line.netTotal}</td>
        </tr>
      `,
            )
            .join("");

        const content = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Guia de Saída de Mercadorias</title>
            <style>
                body {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f4f4f9;
                    display: flex;
                    justify-content: center;
                    padding: 20px;
                }
                .container {
                    width: 100%;
                    max-width: 800px;
                    background: white;
                    padding: 30px;
                    border: 1px solid #ccc;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
                .header {
                    text-align: center;
                    border: 2px solid #000;
                    padding: 10px;
                    margin-bottom: 20px;
                    font-weight: bold;
                    font-size: 1.2em;
                }
                .section {
                    border: 1px solid #333;
                    margin-bottom: 15px;
                    position: relative;
                }
                .section-title {
                    position: absolute;
                    top: -12px;
                    left: 15px;
                    background: white;
                    padding: 0 10px;
                    font-size: 0.8em;
                    font-weight: bold;
                    color: #555;
                }
                .section-content {
                    padding: 15px 10px 10px 10px;
                    line-height: 1.6;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 10px;
                }
                table th, table td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                table th {
                    background-color: #f2f2f2;
                }
                .finance-row {
                    text-align: right;
                    font-weight: bold;
                    margin-top: 10px;
                }
                .signature-area {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 40px;
                    padding: 20px 10px;
                }
                .sig-box {
                    border-top: 1px solid #000;
                    width: 40%;
                    text-align: center;
                    padding-top: 5px;
                    font-size: 0.9em;
                }
                .footer-note {
                    font-size: 0.7em;
                    color: #777;
                    margin-top: 20px;
                    font-style: italic;
                }
            </style>
        </head>
        <body>

        <div class="container">

            <div class="header">
                GUIA DE SAÍDA DE MERCADORIAS ${data.noteId}
            </div>

            <div class="section">
                <span class="section-title">EMPRESA</span>
                <div class="section-content">
                    <strong>Nome:</strong> Raviish<br>
                    <strong>NIF:</strong> 124424242<br>
                    <strong>Endereço:</strong> Ingombota, Luanda, Angola
                </div>
            </div>

            <div class="section">
                <span class="section-title">DESTINATÁRIO</span>
                <div class="section-content">
                    <strong>Nome:</strong> ${data.destination.name}<br>
                    <strong>NIF:</strong> ${data.destination.NIF}<br>
                    <strong>Endereço:</strong> ${data.destination.address}
                </div>
            </div>

            <div style="display: flex; gap: 15px;">
                <div class="section" style="flex: 2;">
                    <span class="section-title">INFORMAÇÕES</span>
                    <div class="section-content">
                        <strong>Guia nº:</strong> ${data.noteId}<br>
                        <strong>Finalidade:</strong> ${data.purpose.description}<br>
                        <strong>Detalhes:</strong> ${data.purpose.details ?? "N/D"}<br>
                        <strong>Responsável:</strong> ${data.purpose.notes}
                    </div>
                </div>
                <div class="section" style="flex: 1;">
                    <span class="section-title">DATAS</span>
                    <div class="section-content">
                        <strong>Saída:</strong> ${data.dateIssue}<br>
                        <strong>Devolução:</strong> ${data.dateReturn}
                    </div>
                </div>
            </div>

            <div class="section">
                <span class="section-title">ITENS</span>
                <div class="section-content">
                    <table>
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Artigo</th>
                                <th>Qtd</th>
                                <th>Preço</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                         ${items}
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="section">
                <span class="section-title">RESUMO FINANCEIRO</span>
                <div class="section-content">
                    <div class="finance-row">Total: ${data.total} KZ</div>
                    <div class="finance-row">Caução: ${data.securityDeposit} KZ</div>
                </div>
            </div>

            <div class="section">
                <span class="section-title">ASSINATURA</span>
                <div class="signature-area">
                    <div class="sig-box">Responsável</div>
                    <div class="sig-box">Cliente</div>
                </div>
            </div>

            <div class="footer-note">
                ${data.hash} - Processado por programa validado n.º 'Não definido ainda'
            </div>

        </div>

        </body>
        </html>
      `;

        const newFile = new File([content], `guia_de_saida_${data.noteId}`, {
            lastModified: Date.now(),
            type: "aplication/json",
        });

        return right(newFile);
    }
}
