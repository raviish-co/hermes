import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["lib/backend/**/*.{test,spec}.ts"],
        coverage: {
            exclude: [
                "lib/backend/tests/**/*",
                "lib/frontend/**/*",
                "**/node_modules/**/*",
                "../../**/.*",
                "../../**/*",
            ],
        },
    },
});
