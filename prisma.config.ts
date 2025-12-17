import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
    schema: "server/backend/persistence/postgres/prisma/schema.prisma",
    migrations: {
        path: "server/backend/persistence/postgres/prisma/migrations",
    },
    datasource: {
        url: env("NUXT_DATABASE_URL"),
    },
});
