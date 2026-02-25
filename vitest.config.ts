import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["server/backend/tests/**/*.{test,spec}.ts"],
        coverage: {
            exclude: [
                "server/backend/tests/**/*",
                "app/**/*",
                "**/node_modules/**/*",
                "../../**/.*",
                "../../**/*",
            ],
        },
    },
});
