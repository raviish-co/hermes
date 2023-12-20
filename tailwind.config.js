/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./components/**/*.vue",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            fontFamily: {
                Manrope: ["Manrope", "sans-serif"],
            },
        },
    },
    plugins: [],
};
