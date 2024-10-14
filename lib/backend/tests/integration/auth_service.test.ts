import { describe, expect, it, vi } from "vitest";
import { AuthService } from "../../application/auth_service";
import { AuthenticationFailed } from "../../domain/auth/authentication_failed_error";
import { InvalidTokenError } from "../../domain/auth/invalid_token_error";
import type {
    TokenGenerator,
    VerifyToken,
} from "../../domain/auth/token_generator";
import { User } from "../../domain/auth/user";
import type { UserRepository } from "../../domain/auth/user_repository";
import { Username } from "../../domain/auth/username";
import { InmemUserRepository } from "../../persistence/inmem/inmem_user_repository";
import { UsernameAlreadyExists } from "../../domain/auth/username_already_exists_error";
import { InvalidUsernameError } from "../../domain/auth/invalid_username_error";

class FakeTokenGenerator implements TokenGenerator {
    async generate(_username: string): Promise<string> {
        return "token";
    }

    async verify(_token: string): Promise<VerifyToken> {
        return { username: "john.doe", isValid: true };
    }
}

describe("Auth Service - Login", async () => {
    it("Deve efectuar o login do utilizador", async () => {
        const { service } = makeService();

        const output = await service.login("johndoe123", "123@Password");

        expect(output.isRight()).toBeTruthy();
        expect(output.value).toEqual({
            token: "token",
            username: "johndoe123",
            name: "John Doe",
        });
    });

    it("Deve retornar **AuthenticationFailed** quando o utilizador não for encontrado", async () => {
        const { service } = makeService();

        const err = await service.login("username", "");

        expect(err.isLeft()).toBeTruthy();
        expect(err.value).toBeInstanceOf(AuthenticationFailed);
    });

    it("Deve retornar **AuthenticationFailed** quanto a senha for inválida", async () => {
        const { service } = makeService();

        const err = await service.login("john.doe", "Password");

        expect(err.isLeft()).toBeTruthy();
        expect(err.value).toBeInstanceOf(AuthenticationFailed);
    });

    it("Deve criar o token de autênticação", async () => {
        const tokenGenerator: TokenGenerator = new FakeTokenGenerator();
        const { service } = makeService(tokenGenerator);

        const spy = vi.spyOn(tokenGenerator, "generate");

        await service.login("johndoe123", "123@Password");

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledOnce();
        expect(spy).toHaveBeenCalledWith("johndoe123");
    });

    it("Deve retornar os dados do utilizador quando o login foi bem sucedido", async () => {
        const { service } = makeService();

        const output = await service.login("johndoe123", "123@Password");

        expect(output.isRight()).toBeTruthy();
        expect(output.value).toEqual({
            username: "johndoe123",
            name: "John Doe",
            token: "token",
        });
    });
});

describe("Auth Service - VerifyToken", async () => {
    it("Deve verificar se o token é válido", async () => {
        const tokenGenerator: TokenGenerator = new FakeTokenGenerator();
        const spy = vi.spyOn(tokenGenerator, "verify");
        const { service } = makeService(tokenGenerator);

        await service.verifyToken("token");

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledOnce();
        expect(spy).toHaveBeenCalledWith("token");
    });

    it("Deve retornar **InvalidToken** quando o token não for válido", async () => {
        const tokenGenerator: TokenGenerator = new FakeTokenGenerator();
        vi.spyOn(tokenGenerator, "verify").mockReturnValue(
            Promise.resolve({ username: "--empty--", isValid: false }),
        );
        const { service } = makeService(tokenGenerator);

        const err = await service.verifyToken("invalid_token");

        expect(err.isLeft()).toBeTruthy();
        expect(err.value).toBeInstanceOf(InvalidTokenError);
    });

    it("Deve retornar o username com base no token a ser verificado", async () => {
        const tokenGenerator: TokenGenerator = new FakeTokenGenerator();
        vi.spyOn(tokenGenerator, "verify").mockReturnValue(
            Promise.resolve({ username: "john.doe", isValid: true }),
        );
        const { service } = makeService();

        const output = await service.verifyToken("token");

        expect(output.isRight()).toBeTruthy();
        expect(output.value).toEqual({
            username: "john.doe",
            isValid: true,
        });
    });
});

describe("Auth Service - Register User", async () => {
    it("Deve registrar um usuário", async () => {
        const { service, userRepository } = makeService();

        const data = {
            username: "johndoe123",
            name: "Jane Doe",
            password: "123@Password",
        };

        await service.registerUser(data);

        const userOrErr = await userRepository.getByUsername(
            Username.fromString(data.username),
        );

        expect(userOrErr.isRight()).toBeTruthy();
    });

    it("Deve encriptar a palavra-passe do utilizador", async () => {
        const { service, userRepository } = makeService();

        const data = {
            username: "johndoe123",
            name: "Jane Doe",
            password: "123@Password",
        };

        await service.registerUser(data);

        const userOrErr = await userRepository.getByUsername(
            Username.fromString(data.username),
        );

        const user = <User> userOrErr.value;

        expect(user.password.value).toBeDefined();
        expect(user.password.value).not.equal(data.password);
    });

    it("Deve retornar erro **UsernameHasBeenUsed** se o username já foi registrado", async () => {
        const { service } = makeService();

        const data = {
            username: "johndoe123",
            name: "Jane Doe",
            password: "123@Password",
        };

        await service.registerUser(data);

        const err = await service.registerUser(data);

        expect(err.isLeft()).toBeTruthy();
        expect(err.value).toBeInstanceOf(UsernameAlreadyExists);
    });

    it("Deve retornar erro **InvalidUsername** se o username for inválido", async () => {
        const { service } = makeService();

        const data = {
            username: "john.doe@",
            name: "Jane Doe",
            password: "123@Password",
        };

        const err = await service.registerUser(data);

        expect(err.isLeft()).toBeTruthy();
        expect(err.value).toBeInstanceOf(InvalidUsernameError);
    });
});

function makeService(tokenGenerator?: TokenGenerator) {
    const user = User.create("johndoe123", "123@Password", "John Doe");

    const userRepository: UserRepository = new InmemUserRepository();

    userRepository.save(<User> user.value);

    const service = new AuthService(
        userRepository,
        tokenGenerator ?? new FakeTokenGenerator(),
    );

    return {
        service,
        userRepository,
    };
}
