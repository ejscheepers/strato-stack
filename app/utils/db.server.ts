import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";

export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
});

//TODO: These migrations are not working if you try and prerender pages, because the database is not running.

// Automatically run migrations on startup
migrate(db, { migrationsFolder: "./drizzle" });
