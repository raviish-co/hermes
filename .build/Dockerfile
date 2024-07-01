FROM oven/bun:1-alpine

WORKDIR /hermes


COPY package.json .



RUN bun install




COPY . .

RUN rm -fr node_modules/.prisma
RUN cp -r __prisma__ node_modules/.prisma


EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080

ENTRYPOINT [ "bun", "run", "dev" ]

# ENTRYPOINT [ "bun", ".output/server/index.mjs" ]

