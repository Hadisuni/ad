# Cloud Run image: build the app and the server, then run only what production needs.
FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js ./server.js
# Cloud Run sets PORT (8080 by default); the server reads it.
EXPOSE 8080
USER node
CMD ["node", "server.js"]
