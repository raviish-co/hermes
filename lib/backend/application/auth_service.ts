import { AuthenticationFailed } from "../domain/auth/authentication_failed_error";
import { InvalidTokenError } from "../domain/auth/invalid_token_error";
import type { InvalidUsernameError } from "../domain/auth/invalid_username_error";
import type {
    TokenGenerator,
    VerifyToken,
} from "../domain/auth/token_generator";
import { User } from "../domain/auth/user";
import type { UserRepository } from "../domain/auth/user_repository";
import { Username } from "../domain/auth/username";
import { UsernameAlreadyExists } from "../domain/auth/username_already_exists_error";
import { type Either, left, right } from "../shared/either";

export class AuthService {
    #userRepository: UserRepository;
    #tokenGenerator: TokenGenerator;

    constructor(
        userRepository: UserRepository,
        tokenGenerator: TokenGenerator,
    ) {
        this.#userRepository = userRepository;
        this.#tokenGenerator = tokenGenerator;
    }

    async login(
        username: string,
        password: string,
    ): Promise<Either<AuthenticationFailed, UserDTO>> {
        const userOrErr = await this.#userRepository.getByUsername(
            Username.fromString(username),
        );
        if (userOrErr.isLeft()) return left(new AuthenticationFailed());

        const isValid = userOrErr.value.checkPassword(password);
        if (!isValid) return left(new AuthenticationFailed());

        const token = await this.#tokenGenerator.generate(username);

        return right({ username, token, name: userOrErr.value.name });
    }

    async registerUser(
        data: UserData,
    ): Promise<Either<UsernameAlreadyExists | InvalidUsernameError, void>> {
        const username = Username.fromString(data.username);
        const userOrErr = await this.#userRepository.getByUsername(username);
        if (userOrErr.isRight()) return left(new UsernameAlreadyExists());

        const newOrErr = User.create(data.username, data.password, data.name);
        if (newOrErr.isLeft()) return left(newOrErr.value);

        await this.#userRepository.save(newOrErr.value);

        return right(undefined);
    }

    async verifyToken(
        token: string,
    ): Promise<Either<InvalidTokenError, VerifyToken>> {
        const result = await this.#tokenGenerator.verify(token);

        if (!result.isValid) return left(new InvalidTokenError());

        return right(result);
    }
}

type UserData = {
    username: string;
    name: string;
    password: string;
};

type UserDTO = {
    username: string;
    name: string;
    token: string;
};
