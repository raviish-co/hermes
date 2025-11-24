import { GmailOtpSender } from "~/lib/backend/adapters/senders/gmail_otp_sender";
import { ConsoleOtpSender } from "../lib/backend/adapters/senders/console_otp_sender";


const gmailOtpSender = new GmailOtpSender();
const consoleOtpSender = new ConsoleOtpSender();

export const useOtpSender = () => process.env.NODE_ENV === "production" ? gmailOtpSender : consoleOtpSender;
