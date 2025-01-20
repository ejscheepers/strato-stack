import * as schema from "@/models/schema.server";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

const sqlite = new Database(
  process.env.NODE_ENV === "production" ? "/data/db.sqlite3" : "./db.sqlite3"
);

export const db = drizzle(sqlite, { schema });

// Automatically run migrations on startup

migrate(db, { migrationsFolder: "./drizzle" });
