import jwt, { type JwtPayload } from "jsonwebtoken";

import type {
    TokenGenerator,
    VerifyToken,
} from "../../domain/auth/token_generator";

export class JSONWebToken implements TokenGenerator {
    constructor(private secretKey: string, private expiresIn: string) {}

    async generate(username: string): Promise<string> {
        const token = jwt.sign({ username }, this.secretKey, {
            expiresIn: this.expiresIn,
        });

        return token;
    }

    async verify(token: string): Promise<VerifyToken> {
        const verifyToken = {
            username: "--empty--",
            isValid: false,
        };

        const payload = jwt.verify(token, this.secretKey);
        if (!payload) {
            return verifyToken;
        }

        const { username } = payload as JwtPayload;

        verifyToken.username = username;
        verifyToken.isValid = true;

        return verifyToken;
    }
}
