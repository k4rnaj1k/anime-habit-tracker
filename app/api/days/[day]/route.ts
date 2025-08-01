import * as SqliteDataService from "@/app/utils/data-utils/sqlite-data-utils";
import { NextResponse } from "next/server";

// Optional: force Node.js runtime if you need Node APIs (e.g., sqlite, fs)
export const runtime = "nodejs";

export async function GET(_req: Request, ctx: { params: Promise<{ day: string }> }) {
  const day = decodeURIComponent((await ctx.params).day);

  // (optional) quick validation: YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) {
    return NextResponse.json(
      { error: 'Invalid "day" format. Expected YYYY-MM-DD.' },
      { status: 400 }
    );
  }

  return NextResponse.json(await SqliteDataService.getDayData(day));
}

export async function POST(req: Request, ctx: { params: Promise<{ day: string }> }) {
  const body: { activity: string; done: boolean } = await req
    .json()
    .catch(() => ({}));
  const day = decodeURIComponent((await ctx.params).day);
  SqliteDataService.updateDay({
    day,
    activityData: { name: body.activity, done: body.done },
  });
  return NextResponse.json({ day: (await ctx.params).day, body });
}
