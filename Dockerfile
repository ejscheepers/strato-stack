# Use a base image with Node.js
FROM node:lts-alpine AS base
WORKDIR /app

# Install curl
RUN apk --no-cache add curl

# Development dependencies stage
FROM base AS development-dependencies-env
COPY package*.json ./
RUN npm ci

# Production dependencies stage
FROM base AS production-dependencies-env
COPY package*.json ./
RUN npm ci --omit=dev

# Build stage
FROM base AS build-env
COPY . .
COPY --from=development-dependencies-env /app/node_modules ./node_modules
RUN npm run build

# Runtime stage
FROM base AS runtime
WORKDIR /app
COPY --from=production-dependencies-env /app/node_modules ./node_modules
COPY --from=build-env /app/build ./build
COPY --from=build-env /app/server.js ./server.js
COPY --from=build-env /app/package.json ./package.json
COPY --from=build-env /app/drizzle ./drizzle

CMD ["npm", "run", "start"]


