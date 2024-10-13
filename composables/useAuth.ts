import { type UserModel } from "~/lib/frontend/models/user";

const USERNAME_KEY = "raviish::username";
const TOKEN_KEY = "raviiish::token";
const NAME_KEY = "raviish::name";

export function useAuth() {
    const isAuthenticated = ref<boolean>(false);

    const login = (user: UserModel) => {
        save(user);
        window.location.assign("/");
    };

    const logout = () => {
        remove();
        window.location.assign("/auth/login");
    };

    const checkAuth = () => {
        const user = getUser();
        if (!user) {
            isAuthenticated.value = false;
            return;
        }

        isAuthenticated.value = true;
        return;
    };

    onMounted(() => {
        checkAuth();
    });

    return {
        isAuthenticated,
        login,
        logout,
        checkAuth,
    };
}

function getUser() {
    if (!import.meta.client) {
        return;
    }

    const username = localStorage.getItem(USERNAME_KEY);
    const token = localStorage.getItem(TOKEN_KEY);
    const name = localStorage.getItem(NAME_KEY);

    if (username && token && name) {
        return {
            username,
            token,
            name,
        };
    }
}

function save(user: UserModel) {
    localStorage.setItem(USERNAME_KEY, user.username);
    localStorage.setItem(TOKEN_KEY, user.token);
    localStorage.setItem(NAME_KEY, user.name);
}

function remove() {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(NAME_KEY);
}
