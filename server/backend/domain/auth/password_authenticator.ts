import type { Authenticator } from "./authenticator";
import type { User } from "./user";


export class PasswordAuthenticator implements Authenticator {
    authenticate(user: User, password: string): boolean {
        return user.checkPassword(password);
    }
}
