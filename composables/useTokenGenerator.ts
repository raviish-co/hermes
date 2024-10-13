import { JSONWebToken } from "~/lib/backend/adapters/jwt/json_web_token";

const tokenGenerator = new JSONWebToken("secret-key", "1h");

export const useTokenGenerator = () => tokenGenerator;
