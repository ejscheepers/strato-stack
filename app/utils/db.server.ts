import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
});

// Automatically run migrations on startup
migrate(db, { migrationsFolder: "./drizzle" });
