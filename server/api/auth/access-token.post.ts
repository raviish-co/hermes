export default defineEventHandler((event) => {
    deleteCookie(event, "raviish::access-token", {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        path: "/",
    });
});
