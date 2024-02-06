// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    modules: ["@vite-pwa/nuxt"],
    app: {
        head: {
            meta: [
                {
                    charset: "utf-8",
                },
            ],
        },
    },
    pwa: {
        manifest: {
            name: "Raviish",
            short_name: "Raviish",
            description: "Aplicação para controlar as solicitações de artigos",
            display: "fullscreen",
            background_color: "#1a1a1a",
            theme_color: "#1a1a1a",
            icons: [
                {
                    src: "icons/152x152.png",
                    sizes: "152x152",
                    type: "image/png",
                },
                {
                    src: "icons/180x180.png",
                    sizes: "180x180",
                    type: "image/png",
                },
                {
                    src: "icons/192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                },
                {
                    src: "icons/384x384.png",
                    sizes: "384x384",
                    type: "image/png",
                },
                {
                    src: "icons/512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                },
            ],
        },
        workbox: {
            navigateFallback: "/",
        },
        devOptions: {
            enabled: true,
            type: "module",
        },
    },
    devtools: { enabled: false },
    css: ["~/assets/css/main.css"],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
});
