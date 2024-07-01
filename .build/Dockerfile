FROM oven/bun:1-alpine

WORKDIR /hermes/


COPY package.json package-lock.json bun.lockb /hermes/

RUN bun install

COPY . /hermes/

RUN bunx prisma generate

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080

ENTRYPOINT [ "bun", "run", "dev" ]

# ENTRYPOINT [ "bun", ".output/server/index.mjs" ]

