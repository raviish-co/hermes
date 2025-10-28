import { fileURLToPath } from "url";

// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    sourcemap: {
        server: true,
        client: true,
    },

    alias: {
        "@backend": fileURLToPath(new URL("./server/backend", import.meta.url)),
        "@frontend": fileURLToPath(new URL("./server/frontend", import.meta.url)),
        "@app": fileURLToPath(new URL("./app", import.meta.url)),
    },

    app: {
        head: {
            charset: "utf-8",
            viewport: "width=device-width, initial-scale=1",
            link: [
                {
                    rel: "stylesheet",
                    href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
                },
                {
                    rel: "manifest",
                    href: "/manifest.json",
                },
            ],
        },
    },

    css: ["~/assets/css/main.css"],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    plugins: ["~/plugins/app_created"],

    runtimeConfig: {
        databaseUrl: process.env.NUXT_DATABASE_URL,
    },

    routeRules: {
        "/**": { appMiddleware: ["auth-guard"], ssr: false },
    },

    compatibilityDate: "2024-10-12",

    devtools: {
        enabled: true,
    },
});
