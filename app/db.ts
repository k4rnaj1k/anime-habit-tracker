// server/db.ts
import sqlite3 from "sqlite3";
import { open, type Database } from "sqlite";
sqlite3.verbose();

// Augment global to survive HMR in dev so we don't create many connections.
declare global {
  // eslint-disable-next-line no-var
  var __dbPromise:
    | Promise<Database<sqlite3.Database, sqlite3.Statement>>
    | undefined;
  // eslint-disable-next-line no-var
  var __migrationsDone: boolean | undefined;
}

async function initDb() {
  const db = await open({
    filename: process.env.SQLITE_PATH ?? "./app.db",
    driver: sqlite3.Database,
  });

  await db.exec("PRAGMA foreign_keys = ON;");
  await db.exec("PRAGMA journal_mode = WAL;");
  await db.exec(`
    create table if not exists activity (
        name text primary key
    );

    create table if not exists activities_days(
        day text,
        activity_name text,
        done boolean,
        primary key(day, activity_name)
    );

    CREATE INDEX IF NOT EXISTS idx_activity_days_day_done
    ON activities_days(day, done);`);
  return db;
}

export async function getDb() {
  if (!global.__dbPromise) {
    global.__dbPromise = initDb();
  }
  return global.__dbPromise;
}
