import type { Authenticator } from "./authenticator";
import { OtpAuthenticator } from "./otp_authenticator";
import type { OtpStorage } from "./otp_storage";
import { PasswordAuthenticator } from "./password_authenticator";


export class AuthFactory {

    constructor(private otpStorage: OtpStorage) {}

    create(password: string): Authenticator {
        if (password.length == 4) {
            return new OtpAuthenticator(this.otpStorage);
        }

        return new PasswordAuthenticator();
    }

}
