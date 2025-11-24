import { gmail_v1, google } from "googleapis";
import type { Sender } from "../../domain/auth/sender";


const SUBJECT = "Raviish - Hermes: Código de Autenticação (OTP)";
const REDIRECT_URI = "urn:ietf:wg:oauth:2.0:oob"
const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

export class GmailOtpSender implements Sender {
  #clientSecret: string;
  #fromEmail: string;
  #clientId:  string;
  #refreshToken: string;

  constructor() {
    const clientSecret = process.env.GMAIL_CLIENT_SECRET;
    const clientId = process.env.GMAIL_CLIENT_ID;
    const refreshToken = process.env.GMAIL_CLIENT_REFRESH_TOKEN;
    const fromEmail = process.env.GMAIL_CLIENT_FROM_EMAIL;

    if (!clientSecret) {
      throw new Error("GMAIL_CLIENT_SECRET is not defined.");
    }

    if (!fromEmail) {
      throw new Error("GMAIL_CLIENT_FROM_EMAIL is not defined.");
    }

    if (!clientId) {
      throw new Error("GMAIL_CLIENT_ID is not defined.");
    }

    if (!refreshToken) {
      throw new Error("GMAIL_CLIENT_REFRESH_TOKEN is not defined.");
    }

    this.#clientId = clientId;
    this.#clientSecret = clientSecret;
    this.#fromEmail = fromEmail;
    this.#refreshToken = refreshToken;
  }


  async #authorize(): Promise<gmail_v1.Gmail> {
    try {

      const oAuth2Client = new google.auth.OAuth2({
        clientId: this.#clientId,
        clientSecret: this.#clientSecret,
        redirectUri: REDIRECT_URI,
      });


      oAuth2Client.setCredentials({
        refresh_token: this.#refreshToken,
        scope: SCOPES.join(" "),
      });

      const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
      return gmail;
    } catch (error: any) {
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
            `from: "Raviish - Hermes" <${this.#fromEmail}>`,
            `replyTo: "Raviish - Hermes" <${this.#fromEmail}>`,
            `subject: =?UTF-8?B?${Buffer.from(SUBJECT).toString("base64")}?=`,
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
    return `<!DOCTYPE html>
        <html>
          <body style="font-family: Arial, sans-serif; background-color:#f2f2f2; padding:20px;">
            <table width="100%" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center">
                  <table width="420" cellpadding="20" cellspacing="0" style="background:white; border-radius:10px;">
                    <tr>
                      <td style="text-align:center;">
                        <h2 style="margin-bottom:10px; color:#333;">Código de Autenticação</h2>
                        <p style="color:#555; font-size:16px;">
                          Utilize o código abaixo para continuar o seu processo de autenticação.
                        </p>

                        <div style="
                              font-size:32px;
                              font-weight:bold;
                              letter-spacing:5px;
                              margin:20px 0;
                              color:#d1a98b;
                            ">
                          ${otp}
                        </div>


                        <hr style="border:none; border-top:1px solid #ddd; margin:25px 0;">

                        <p style="font-size:12px; color:#999;">
                          Se não pediu este código, ignore este e-mail.
                        </p>

                        <p style="font-size:12px; color:#222; margin-top:30px;">
                          Raviish - Hermes, ${new Date().getFullYear()}
                        </p>

                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
`;
}
