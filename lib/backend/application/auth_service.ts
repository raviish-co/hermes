import { AuthenticationFailed } from "../domain/auth/authentication_failed_error";
import { InvalidTokenError } from "../domain/auth/invalid_token_error";
import type {
    TokenGenerator,
    VerifyToken,
} from "../domain/auth/token_generator";
import type { UserRepository } from "../domain/auth/user_repository";
import { Username } from "../domain/auth/username";
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

    async verifyToken(
        token: string,
    ): Promise<Either<InvalidTokenError, VerifyToken>> {
        const result = await this.#tokenGenerator.verify(token);

        if (!result.isValid) return left(new InvalidTokenError());

        return right(result);
    }
}

type UserDTO = {
    username: string;
    name: string;
    token: string;
};
