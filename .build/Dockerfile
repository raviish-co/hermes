FROM node:22-alpine

RUN apk add --no-cache openssl libc6-compat

WORKDIR /hermes


COPY package*.json .

RUN npm i

COPY . .

RUN npx prisma generate
RUN npm run build


EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080


ENTRYPOINT [ "node", ".output/server/index.mjs" ]

