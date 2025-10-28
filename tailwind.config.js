/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/components/**/*.vue",
        "./app/layouts/**/*.vue",
        "./app/pages/**/*.vue",
        "./app/app.vue",
        "./app/error.vue",
    ],
    theme: {
        extend: {
            fontFamily: {
                Roboto: ["Roboto", "sans-serif"],
            },
            colors: {
                primary: "#1a1a1a",
                secondary: {
                    500: "#d1a98b",
                    600: "#bb8054",
                },
                light: {
                    500: "#bababa",
                    600: "#878787",
                },
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
