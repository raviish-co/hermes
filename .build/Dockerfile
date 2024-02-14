FROM node:20-alpine

WORKDIR /raviish/


COPY package.json /raviish/
COPY package-lock.json /raviish/

RUN npm ci

COPY . /raviish/

RUN npm run build

EXPOSE 8080

ENV HOST=0.0.0.0

ENV PORT=8080


ENTRYPOINT [ "node", ".output/server/index.mjs" ]
