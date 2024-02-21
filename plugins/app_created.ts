export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook("app:created", async () => {
        usePurpose().refresh();

        useVariations().refresh();
    });
});
