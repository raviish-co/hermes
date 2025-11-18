import { GmailOtpSender } from "~/lib/backend/adapters/senders/gmail_otp_sender";
import { ConsoleOtpSender } from "../lib/backend/adapters/senders/console_otp_sender";

const gmailClientEmail = process.env.GMAIL_CLIENT_EMAIL as string;
const gmailClientSecretKey = process.env.GMAIL_CLIENT_SECRET_KEY as string;

const gmailOtpSender = new GmailOtpSender(gmailClientEmail, gmailClientSecretKey);
const consoleOtpSender = new ConsoleOtpSender();

const sender = process.env.NODE_ENV === "production" ? gmailOtpSender : consoleOtpSender;

export const useOtpSender = () => sender;
