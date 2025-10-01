import { JSONWebToken } from "~/lib/backend/adapters/jwt/json_web_token";

const tokenGenerator = new JSONWebToken("secret-key", "1d");

export const useTokenGenerator = () => tokenGenerator;
