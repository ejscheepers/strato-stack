FROM node:lts-alpine AS base
WORKDIR /app

# Install curl
RUN apk --no-cache add curl

FROM base AS build

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

FROM base AS runtime

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/build/server ./build/server
COPY --from=build /app/build/client ./build/client
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/server/server.ts ./server/server.ts


# Move the drizzle directory to the runtime image
COPY --from=build /app/drizzle ./drizzle

ENV HOST=0.0.0.0
ENV PORT=8000
ENV NODE_ENV=production


EXPOSE 8000
CMD ["npm", "run", "start"]


