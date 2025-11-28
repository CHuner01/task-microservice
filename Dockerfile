# Build stage
FROM node:18-bullseye AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm ci

COPY . .
RUN npx prisma generate
RUN npm run build

# Production stage
FROM node:18-bullseye-slim

WORKDIR /app

# Установим необходимые пакеты для PostgreSQL
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm ci --only=production

# Копируем ВСЕ исходные файлы, включая Swagger
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/src ./src

EXPOSE 3000

CMD ["node", "dist/server.js"]