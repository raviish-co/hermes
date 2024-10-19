import { ConsoleOtpSender } from "~/lib/backend/adapters/console/console_otp_sender";

const sender = new ConsoleOtpSender();

export const useOtpSender = () => sender;
