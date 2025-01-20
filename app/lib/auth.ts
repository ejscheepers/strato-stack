import { db } from "@/utils/db.server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite", // or "mysql", "sqlite"
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
});
