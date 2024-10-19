// import { AuthenticationFailed } from "../domain/auth/authentication_failed_error";
// import type { OtpStorage } from "../domain/auth/otp_storage";
// import type { TokenGenerator } from "../domain/auth/token_generator";
// import type { UserRepository } from "../domain/auth/user_repository";
// import { Username } from "../domain/auth/username";
// import { type Either, left, right } from "../shared/either";
// import type { UserDTO } from "./auth_service";
// import type { Authenticator } from "./Authenticator";

import type { Authenticator } from "./authenticator";
import type { OtpStorage } from "./otp_storage";
import type { User } from "./user";


export class OtpAuthenticator implements Authenticator {
    constructor(private otpStorage: OtpStorage) {}

    authenticate(user: User, password: string): boolean {
        const otp = this.otpStorage.get(user.username.value);
        if (otp === password) {
            return true;
        }

        return false;
    }
}
