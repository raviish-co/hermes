const auth = useAuth();

export class AuthService {
    async authenticate(
        username: string,
        password: string,
    ): Promise<{ message: string } | undefined> {
        try {
            const user = await $fetch("/api/auth/login/", {
                method: "post",
                body: { username, password },
            });

            auth.login(user);
        } catch (error: any) {
            if (error.statusCode === 401) {
                return { message: "Credenciais inválidas" };
            }

            return {
                message:
                    "Erro desconhecido, contacte o administrador do sistema.",
            };
        }
    }
}
