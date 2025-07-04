// save draft using (POST) method

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // 👇 This is just a placeholder — in real apps you'd save this
  console.log("📩 Draft received:", body);

  // ✅ Send success response back to frontend
  return NextResponse.json({
    message: "Draft received successfully (but not saved).",
    received: body,
  });
}
