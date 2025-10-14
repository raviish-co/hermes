import type { Authenticator } from "./authenticator";
import { OtpAuthenticator } from "./otp_authenticator";
import type { OtpStorage } from "./otp_storage";
import { PasswordAuthenticator } from "./password_authenticator";

enum Mode {
    Otp = "Otp",
    Default = "Default",
}

export class AuthFactory {
    constructor(private otpStorage: OtpStorage) {}

    create(mode: string): Authenticator {
        if (mode === Mode.Otp) {
            return new OtpAuthenticator(this.otpStorage);
        }

        if (mode === Mode.Default) {
            return new PasswordAuthenticator();
        }

        throw new Error("Authentication strategy failed to load");
    }
}
