import type { Sender } from "../../domain/auth/sender";

export class ConsoleOtpSender implements Sender {
    async send(to: string, message: string): Promise<void> {
        console.log(`Sending OTP to ${to}: ${message}`);
    }
}
