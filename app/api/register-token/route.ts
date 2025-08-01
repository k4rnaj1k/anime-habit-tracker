import { NextResponse } from "next/server";
import * as SQLiteDataService from '@/app/utils/data-utils/sqlite-data-utils';

export async function POST(req: Request) {
  const body: { token: string } = await req
    .json()
    .catch(() => ({}));
    const { token } = body;
  await SQLiteDataService.saveToken(token);
  return NextResponse.json({ body });
}
