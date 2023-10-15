import {
  timestamp,
  pgTable,
  text,
  primaryKey,
  integer,
  uniqueIndex,
  serial,
} from "drizzle-orm/pg-core";

export const users = pgTable(
  "user",
  {
    id: serial("id").primaryKey().notNull(),
    email: text("email").notNull(),
    password: text("password").notNull(),
    avatar: text("avatar").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (users) => {
    return {
      usernameIndex: uniqueIndex("email_idx").on(users.email),
    };
  },
);

export const shows = pgTable(
  "shows",
  {
    id: serial("id").primaryKey().notNull(),
    showId: integer("show_id"),
    posterPath: text("poster_path").notNull(),
    title: text("title").notNull(),
    userId: integer("user_id").references(() => users.id),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (shows) => {
    return {
      titleIndex: uniqueIndex("title_idx").on(shows.id),
    };
  },
);
