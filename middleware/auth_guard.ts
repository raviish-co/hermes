import { useAuth } from "~/composables/useAuth";

const { isAuthenticated, checkAuth } = useAuth();

checkAuth();

export default defineNuxtRouteMiddleware((to, _from) => {
    if (to.path === "/auth/login" && isAuthenticated.value) {
        return navigateTo("/");
    }

    if (to.path !== "/auth/login" && !isAuthenticated.value) {
        return navigateTo("/auth/login");
    }
});
