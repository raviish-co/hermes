import { describe, expect, it, vi } from "vitest";
import { AuthService } from "../../application/auth_service";
import { AuthenticationFailed } from "../../domain/auth/authentication_failed_error";
import type { TokenGenerator } from "../../domain/auth/token_generator";
import { User } from "../../domain/auth/user";
import type { UserRepository } from "../../domain/auth/user_repository";
import { InmemUserRepository } from "../../persistence/inmem/inmem_user_repository";

class FakeTokenGenerator implements TokenGenerator {
    async generate(_username: string): Promise<string> {
        return "token";
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

function makeService(tokenGenerator?: TokenGenerator): AuthService {
    const user = new User("john.doe", "123@Password", "John Doe");

    const userRepository: UserRepository = new InmemUserRepository();

    userRepository.save(user);

    return new AuthService(
        userRepository,
        tokenGenerator ?? new FakeTokenGenerator(),
    );
}
