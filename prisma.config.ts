import { defineConfig } from "prisma/config";

export default defineConfig({
    schema: "lib/backend/persistence/postgres/prisma/schema.prisma",
    migrations: {
        path: "lib/backend/persistence/postgres/prisma/migrations",
    },
});
