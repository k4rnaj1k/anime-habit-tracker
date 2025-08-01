import { NextResponse } from "next/server";

// Optional: force Node.js runtime if you need Node APIs (e.g., sqlite, fs)
export const runtime = "nodejs";

export async function GET(_req: Request, ctx: { params: { day: string } }) {
  const day = decodeURIComponent(ctx.params.day);

  // (optional) quick validation: YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) {
    return NextResponse.json(
      { error: 'Invalid "day" format. Expected YYYY-MM-DD.' },
      { status: 400 }
    );
  }

  return NextResponse.json({ day, message: `You requested ${day}` });
}

// (optional) handle POST as well
export async function POST(req: Request, ctx: { params: { day: string } }) {
  const body = await req.json().catch(() => ({}));
  return NextResponse.json({ day: ctx.params.day, body });
}
