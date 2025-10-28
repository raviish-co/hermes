import type { Sender } from "../../domain/auth/sender";

const OMBALA_SEND_CAUSE = "OmbalaOtpSender:sender";

export class OmbalaOtpSender implements Sender {
    constructor(readonly baseUrl: string, readonly token: string, readonly from: string) {
        if (!baseUrl) {
            throw new FailedOtpSendError(OMBALA_SEND_CAUSE, "OMBALA_BASE_URL not defined");
        }

        if (!token) {
            throw new FailedOtpSendError(OMBALA_SEND_CAUSE, "OMBALA_TOKEN not defined");
        }

        if (!from) {
            throw new FailedOtpSendError(OMBALA_SEND_CAUSE, "OMBALA_FROM not defined");
        }
    }

    async send(to: string, message: string): Promise<void> {
        const url = new URL(`${this.baseUrl}/v1/messages`);

        const body = {
            to,
            message: `Código de autenticação: ${message}`,
            from: this.from,
        };

        try {
            await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Token ${this.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
        } catch (error) {
            throw new FailedOtpSendError(OMBALA_SEND_CAUSE, "Failed to send OTP");
        }
    }
}

class FailedOtpSendError extends Error {
    constructor(cause: string, message: string) {
        super(`${cause} - ${message}`);
        this.cause = cause;
    }
}
