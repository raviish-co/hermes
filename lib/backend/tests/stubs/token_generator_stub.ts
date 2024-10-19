import type { TokenGenerator, VerifyToken } from "../../domain/auth/token_generator";

export class TokenGeneratorStub implements TokenGenerator {
    async generate(_username: string): Promise<string> {
        return "token";
    }

    async verify(_token: string): Promise<VerifyToken> {
        return { username: "john.doe", isValid: true };
    }
}
