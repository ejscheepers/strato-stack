import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", {
    mode: "boolean",
  }).notNull(),
  image: text("image"),
  createdAt: integer("createdAt", {
    mode: "timestamp",
  }).notNull(),
  updatedAt: integer("updatedAt", {
    mode: "timestamp",
  }).notNull(),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  accessToken: text("accessToken"),
  accessTokenExpiresAt: integer("accessTokenExpiresAt", {
    mode: "timestamp",
  }),
  refreshToken: text("refreshToken"),
  refreshTokenExpiresAt: integer("refreshTokenExpiresAt", {
    mode: "timestamp",
  }),
  password: text("password"),
  scope: text("scope"),
  createdAt: integer("createdAt", {
    mode: "timestamp",
  })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updatedAt", {
    mode: "timestamp",
  })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expiresAt", {
    mode: "timestamp",
  }).notNull(),
  token: text("token").notNull().default(""),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  createdAt: integer("createdAt", {
    mode: "timestamp",
  })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updatedAt", {
    mode: "timestamp",
  })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expiresAt", {
    mode: "timestamp",
  }).notNull(),
  createdAt: integer("createdAt", {
    mode: "timestamp",
  })
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: integer("updatedAt", {
    mode: "timestamp",
  })
    .notNull()
    .default(sql`(unixepoch())`),
});

export const todo = sqliteTable("todo", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  text: text("text").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  completed: text("completed").notNull().default("false"),
});
