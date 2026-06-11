FROM node:24.14.0 AS build

ARG APP_PORT=8031

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . ./
RUN npm run build


EXPOSE ${APP_PORT}

CMD ["node", "dist/server.js"]
