import type { UserModel } from "~/lib/frontend/models/user";

const NAME_KEY = "raviish::name";
const USERNAME_KEY = "raviish::username";

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

    const checkAuth = async () => {
        const user = await getUser();
        if (!user) {
            isAuthenticated.value = false;
            return;
        }

        isAuthenticated.value = true;
        return;
    };

    const getAccessToken = () => {
        return getAccessTokenWithFetch();
    };

    const getName = async () => {
        const user = await getUser();
        if (!user) {
            return "";
        }

        return user.name;
    };

    const getUsername = async () => {
        const user = await getUser();
        if (!user) {
            return "";
        }

        return user.username;
    };

    return {
        isAuthenticated,
        login,
        logout,
        checkAuth,
        getAccessToken,
        getName,
        getUsername,
    };
}

const getAccessTokenWithFetch = async () => {
    const data = await $fetch("/api/auth/access-token", {
        method: "GET",
    });

    if (!data) {
        return "";
    }

    return data.accessToken as string;
};

const deleteAccessToken = () => {
    $fetch("/api/auth/access-token", {
        method: "POST",
    });
};

async function getUser() {
    if (!import.meta.client) {
        return;
    }

    const name = localStorage.getItem(NAME_KEY);
    const username = localStorage.getItem(USERNAME_KEY);
    const accessToken = await getAccessTokenWithFetch();

    if (username && accessToken && name) {
        return {
            username,
            accessToken,
            name,
        };
    }
}

function save(user: UserModel) {
    localStorage.setItem(USERNAME_KEY, user.username);
    localStorage.setItem(NAME_KEY, user.name);
}

function remove() {
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(NAME_KEY);
    deleteAccessToken();
}
