import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["lib/backend/**/*.{test,spec}.ts"],
    },
});
