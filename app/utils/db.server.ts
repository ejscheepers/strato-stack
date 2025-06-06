import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pkg from "pg";
const { Pool } = pkg;

// Regular connection through PgBouncer for application operations
export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL,
  },
});

// Direct connection to PostgreSQL for migrations
const pool = new Pool({
  connectionString: process.env.DATABASE_URL?.replace("pgbouncer", "postgres"), // Direct PostgreSQL port
});

export const dbDirect = drizzle(pool);

// Automatically run migrations on startup
migrate(dbDirect, { migrationsFolder: "./drizzle" });
