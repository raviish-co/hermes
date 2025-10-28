import { AuthFactory } from "../domain/auth/auth_factory";
import { AuthenticationFailed } from "../domain/auth/authentication_failed_error";
import { InvalidTokenError } from "../domain/auth/invalid_token_error";
import type { OtpStorage } from "../domain/auth/otp_storage";
import type { Sender } from "../domain/auth/sender";
import type { TokenGenerator, VerifyToken } from "../domain/auth/token_generator";
import { UserNotFound } from "../domain/auth/user_not_found";
import type { UserRepository } from "../domain/auth/user_repository";
import { Username } from "../domain/auth/username";
import { type Either, left, right } from "../shared/either";

export class AuthService {
    #userRepository: UserRepository;
    #tokenGenerator: TokenGenerator;
    #otpStorage: OtpStorage;
    #otpSender: Sender;

    constructor(
        userRepository: UserRepository,
        tokenGenerator: TokenGenerator,
        otpStorage: OtpStorage,
        otpSender: Sender
    ) {
        this.#userRepository = userRepository;
        this.#tokenGenerator = tokenGenerator;
        this.#otpStorage = otpStorage;
        this.#otpSender = otpSender;
    }

    async login(
        username: string,
        password: string,
        mode = "Otp"
    ): Promise<Either<AuthenticationFailed, UserDTO>> {
        const userOrErr = await this.#userRepository.getByUsername(Username.fromString(username));
        if (userOrErr.isLeft()) return left(new AuthenticationFailed());

        const factory = new AuthFactory(this.#otpStorage);

        const authenticator = factory.create(mode);

        const isValid = authenticator.authenticate(userOrErr.value, password);

        if (!isValid) return left(new AuthenticationFailed());

        const accessToken = await this.#tokenGenerator.generate(username);

        return right({ username, accessToken, name: userOrErr.value.name });
    }

    async generateOtp(username: string): Promise<Either<UserNotFound, void>> {
        const userOrErr = await this.#userRepository.getByUsername(Username.fromString(username));
        if (userOrErr.isLeft()) return left(new UserNotFound());

        const otp = generateCode();

        this.#otpStorage.save(username, otp);

        await this.#otpSender.send(userOrErr.value.phoneNumber, otp);

        return right(undefined);
    }

    async verifyToken(token: string): Promise<Either<InvalidTokenError, VerifyToken>> {
        const result = await this.#tokenGenerator.verify(token);

        if (!result.isValid) return left(new InvalidTokenError());

        return right(result);
    }
}

function generateCode() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

export type UserDTO = {
    username: string;
    name: string;
    accessToken: string;
};
