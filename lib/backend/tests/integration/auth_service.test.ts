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
import { InmemUserRepository } from "../../persistence/inmem/inmem_user_repository";

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
        const service = makeService();

        const output = await service.login("john.doe", "123@Password");

        expect(output.isRight()).toBeTruthy();
        expect(output.value).toEqual({
            token: "token",
            username: "john.doe",
            name: "John Doe",
        });
    });

    it("Deve retornar **AuthenticationFailed** quando o utilizador não for encontrado", async () => {
        const service = makeService();

        const err = await service.login("username", "");

        expect(err.isLeft()).toBeTruthy();
        expect(err.value).toBeInstanceOf(AuthenticationFailed);
    });

    it("Deve retornar **AuthenticationFailed** quanto a senha for inválida", async () => {
        const service = makeService();

        const err = await service.login("john.doe", "Password");

        expect(err.isLeft()).toBeTruthy();
        expect(err.value).toBeInstanceOf(AuthenticationFailed);
    });

    it("Deve criar o token de autênticação", async () => {
        const tokenGenerator: TokenGenerator = new FakeTokenGenerator();
        const service = makeService(tokenGenerator);

        const spy = vi.spyOn(tokenGenerator, "generate");

        await service.login("john.doe", "123@Password");

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledOnce();
        expect(spy).toHaveBeenCalledWith("john.doe");
    });

    it("Deve retornar os dados do utilizador quando o login foi bem sucedido", async () => {
        const service = makeService();

        const output = await service.login("john.doe", "123@Password");

        expect(output.isRight()).toBeTruthy();
        expect(output.value).toEqual({
            username: "john.doe",
            name: "John Doe",
            token: "token",
        });
    });
});

describe("Auth Service - VerifyToken", async () => {
    it("Deve verificar se o token é válido", async () => {
        const tokenGenerator: TokenGenerator = new FakeTokenGenerator();
        const spy = vi.spyOn(tokenGenerator, "verify");
        const service = makeService(tokenGenerator);

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
        const service = makeService(tokenGenerator);

        const err = await service.verifyToken("invalid_token");

        expect(err.isLeft()).toBeTruthy();
        expect(err.value).toBeInstanceOf(InvalidTokenError);
    });

    it("Deve retornar o username com base no token a ser verificado", async () => {
        const tokenGenerator: TokenGenerator = new FakeTokenGenerator();
        vi.spyOn(tokenGenerator, "verify").mockReturnValue(
            Promise.resolve({ username: "john.doe", isValid: true }),
        );
        const service = makeService();

        const output = await service.verifyToken("token");

        expect(output.isRight()).toBeTruthy();
        expect(output.value).toEqual({
            username: "john.doe",
            isValid: true,
        });
    });
});

function makeService(tokenGenerator?: TokenGenerator): AuthService {
    const user = new User("john.doe", "123@Password", "John Doe");

    const userRepository: UserRepository = new InmemUserRepository();

    userRepository.save(user);

    return new AuthService(
        userRepository,
        tokenGenerator ?? new FakeTokenGenerator(),
    );
}
