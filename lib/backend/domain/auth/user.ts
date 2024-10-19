import { Password } from "./password";
import { Username } from "./username";
import { type Either, left, right } from "../../shared/either";
import { InvalidUsernameError } from "./invalid_username_error";

export class User {
    readonly username: Username;
    readonly #password: Password;
    #name: string;
    #phoneNumber: string;

    constructor(username: string, password: string, name: string, phoneNumber: string) {
        this.username = Username.fromString(username);
        this.#password = Password.fromString(password);
        this.#name = name;
        this.#phoneNumber = phoneNumber;
    }

    static create(
        username: string,
        password: string,
        name: string,
        phoneNumber: string,
    ): Either<InvalidUsernameError, User> {
        if (!Username.isValid(username)) {
            return left(new InvalidUsernameError());
        }

        return right(new User(username, password, name, phoneNumber));
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
}
