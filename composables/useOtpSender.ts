import { ConsoleOtpSender } from "../lib/backend/adapters/senders/console_otp_sender";

export const useOtpSender = () => new ConsoleOtpSender();
