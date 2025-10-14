const auth = useAuth();

export class AuthService {
    async authenticate(
        username: string,
        password: string,
        mode?: "Otp" | "Default"
    ): Promise<{ message: string } | undefined> {
        try {
            const user = await $fetch("/api/auth/login/", {
                method: "post",
                body: { username, password, mode },
            });

            auth.login(user);
        } catch (error: any) {
            if (error.statusCode === 401) {
                return { message: "Credenciais inválidas" };
            }

            return {
                message: "Erro desconhecido, contacte o administrador do sistema.",
            };
        }
    }

    async generateOtp(username: string): Promise<{ message: string } | void> {
        try {
            await $fetch("/api/auth/generate-otp/", {
                method: "post",
                body: { username },
            });
        } catch (error: any) {
            if (error.statusCode === 404) {
                return { message: "Utilizador inválido" };
            }

            return {
                message: "Erro desconhecido, contacte o administrador do sistema.",
            };
        }
    }
}
