import { ConsoleOtpSender } from "@backend/adapters/senders/console_otp_sender";
import { OmbalaOtpSender } from "@backend/adapters/senders/ombala_otp_sender";

const url = process.env.OMBALA_BASE_URL as string;
const token = process.env.OMBALA_TOKEN as string;
const from = process.env.OMBALA_FROM as string;

const sender =
    process.env.NODE_ENV === "development"
        ? new ConsoleOtpSender()
        : new OmbalaOtpSender(url, token, from);

export const useOtpSender = () => sender;
