import { useAuth } from "~/composables/useAuth";

const { isAuthenticated, checkAuth } = useAuth();

export default defineNuxtRouteMiddleware(async (to, _from) => {
    await checkAuth();

    if (to.path === "/auth/login" && isAuthenticated.value) {
        return navigateTo("/");
    }

    if (to.path !== "/auth/login" && !isAuthenticated.value) {
        return navigateTo("/auth/login");
    }
});
