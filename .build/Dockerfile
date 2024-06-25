FROM node:20-alpine

WORKDIR /raviish/


COPY package.json /raviish/
COPY package-lock.json /raviish/

ARG DATABASE_URL
RUN echo "NUXT_DATABASE_URL=$DATABASE_URL" >> .env

RUN npm ci
COPY . /raviish/

RUN npx prisma generate
RUN npx prisma migrate deploy
RUN npm run build

EXPOSE 8080

ENV HOST=0.0.0.0
ENV PORT=8080

ENTRYPOINT [ "node", ".output/server/index.mjs" ]
