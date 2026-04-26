import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Prisma API v2 — use /api/career-match and /api/roadmap" });
}
