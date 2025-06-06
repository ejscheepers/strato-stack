import { account, session, user, verification } from "@/models/schema";

import { dbDirect } from "@/utils/db.server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(dbDirect, {
    provider: "pg",
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  trustedOrigins: ["https://strato-express.eugenescheepers.com"],

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
});
