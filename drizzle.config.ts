import type { Config } from "drizzle-kit";

export default {
  schema: "./app/models/schema.server.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;
