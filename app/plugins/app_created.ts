export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook("app:created", async () => {
        usePurposeSpecification().refresh();

        useVariations().refresh();
    });
});
