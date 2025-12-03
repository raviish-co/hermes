import { GmailOtpSender } from "@backend/adapters/senders/gmail_otp_sender";
import { ConsoleOtpSender } from "@backend/adapters/senders/console_otp_sender";

const clientSecret = process.env.GMAIL_CLIENT_SECRET;
const clientId = process.env.GMAIL_CLIENT_ID;
const refreshToken = process.env.GMAIL_CLIENT_REFRESH_TOKEN;
const fromEmail = process.env.GMAIL_CLIENT_FROM_EMAIL;

const gmailOtpSender = new GmailOtpSender(clientId!, clientSecret!, fromEmail!, refreshToken!);
const consoleOtpSender = new ConsoleOtpSender();

export const useOtpSender = () =>
    process.env.NODE_ENV === "production" ? gmailOtpSender : consoleOtpSender;
