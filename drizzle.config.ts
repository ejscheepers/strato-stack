import type { Config } from "drizzle-kit";

export default {
  schema: "./app/models/schema.server.ts",
  dialect: "sqlite",
  out: "./drizzle",
  dbCredentials: {
    url:
      process.env.NODE_ENV === "production"
        ? "/data/remix-lite-stack/db.sqlite3"
        : "./db.sqlite3",
  },
} satisfies Config;
