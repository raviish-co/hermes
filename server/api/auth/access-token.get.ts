export default defineEventHandler((event) => {
    const token = getCookie(event, "raviish::access-token");
    if (!token) {
        return { accessToken: "" };
    }

    return { accessToken: token };
});
