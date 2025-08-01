import { NextResponse } from "next/server";
import { getDb } from "@/app/db";
import * as SqliteDataService from "@/app/utils/data-utils/sqlite-data-utils";
// If you have a repository/service, import and call it instead.

export const runtime = "nodejs"; // IMPORTANT: SQLite needs Node runtime, not Edge.

export async function GET() {
  const db = await getDb();
  const activities = await db.all("SELECT * FROM activity");
  return NextResponse.json(activities || []);
}

export async function POST(req: Request) {
    const activity = await req.json();
    SqliteDataService.createActivity(activity);
    return NextResponse.json({ message: 'Success'});
}