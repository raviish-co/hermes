import { Password } from "./password";
import { Username } from "./username";

export class User {
    readonly username: Username;
    readonly #password: Password;
    #name: string;
    #phoneNumber: string;
    #email: string;

    constructor(
        username: string,
        password: string,
        name: string,
        phoneNumber: string,
        email: string
    ) {
        this.username = Username.fromString(username);
        this.#password = Password.fromString(password);
        this.#name = name;
        this.#phoneNumber = phoneNumber;
        this.#email = email;
    }

    checkPassword(password: string): boolean {
        return this.#password.isValid(password);
    }

    get name(): string {
        return this.#name;
    }

    get phoneNumber(): string {
        return this.#phoneNumber;
    }

    get password(): Password {
        return this.#password;
    }

    get email(): string {
        return this.#email;
    }
}
