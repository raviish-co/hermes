import type { User } from "./user";



export interface Authenticator {
    authenticate(user: User, password: string): boolean;
}
