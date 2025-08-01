import { NextResponse } from "next/server";
import { getDb } from "@/app/db";
// If you have a repository/service, import and call it instead.

export const runtime = "nodejs"; // IMPORTANT: SQLite needs Node runtime, not Edge.

export async function GET() {
  const db = await getDb();
  const activities = await db.all("SELECT * FROM activities ORDER BY id");
  return NextResponse.json(activities);
}