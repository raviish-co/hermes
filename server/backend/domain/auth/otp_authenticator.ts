import type { Authenticator } from "./authenticator";
import type { OtpStorage } from "./otp_storage";
import type { User } from "./user";


export class OtpAuthenticator implements Authenticator {
    constructor(private otpStorage: OtpStorage) {}

    authenticate(user: User, password: string): boolean {
        const otp = this.otpStorage.get(user.username.value);

        if (!otp) return false;

        if (otp === password) {
            this.otpStorage.remove(user.username.value);
            return true;
        }

        return false;
    }
}
