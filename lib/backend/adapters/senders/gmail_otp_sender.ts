import { gmail_v1, google } from "googleapis";
import type { Sender } from "../../domain/auth/sender";

const FROM_EMAIL = "exampleemail@gmail.com";
const SUBJECT = "Raviish - Hermes: Código de Autenticação (OTP)";

const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

export class GmailOtpSender implements Sender {
    gmailClientEmail: string;
    #gmailClientSecretKey: string;

    constructor(gmailClientEmail: string, gmailClientSecretKey: string) {
        if (!gmailClientEmail) {
            throw new Error("GmailSender: Gmail Client Email is required");
        }

        if (!gmailClientSecretKey) {
            throw new Error("GmailSender: Gmail Client Secret is required");
        }

        this.gmailClientEmail = gmailClientEmail;
        this.#gmailClientSecretKey = gmailClientSecretKey;
    }

    async #authorize(): Promise<gmail_v1.Gmail> {
        try {
            const jwtClient = new google.auth.JWT({
                email: this.gmailClientEmail,
                key: this.#gmailClientSecretKey,
                scopes: SCOPES,
                subject: FROM_EMAIL,
            });

            await jwtClient.authorize();

            const gmail = google.gmail({ version: "v1", auth: jwtClient });
            console.log("Gmail API service initialized successfully.");
            return gmail;
        } catch (error: Error | any) {
            console.error("Authorization failed:", error);
            throw new Error(`Failed to authorize Gmail API: ${error.message}`);
        }
    }

    async send(to: string, code: string): Promise<void> {
        console.log(`Sending email to ${to}...`);

        const gmail = await this.#authorize();

        const emailLines = [
            `Content-Type: text/html; charset="UTF-8"`,
            `MIME-Version: 1.0`,
            `Content-Transfer-Encoding: 7bit`,
            `to: ${to}`,
            `from: "Raviish - Hermes" <${FROM_EMAIL}>`,
            `replyTo: "Raviish - Hermes" <${FROM_EMAIL}>`,
            `subject: ${SUBJECT}`,
            "",
            emailBody(code),
        ];

        const email = emailLines.join("\r\n");
        const encodedMessage = Buffer.from(email)
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

        try {
            const res = await gmail.users.messages.send({
                userId: "me",
                requestBody: {
                    raw: encodedMessage,
                },
            });
            console.log("Email sent successfully! Message ID:", res.data.id);
        } catch (error) {
            console.error("Failed to send email:", error);
            throw error;
        }
    }
}

function emailBody(otp: string): string {
    return `<html>
<head>
  <title>Raviish Hermes</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <p>Olá senhor (a),</p>

    <p>Este é o seu código de autenticação: ${otp} </p>
  </div>
</body>
</html>`;
}
