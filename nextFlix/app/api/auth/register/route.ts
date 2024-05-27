import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const request = await req.json();
  console.log(request, "request");
  return NextResponse.json({ message: "Success" }, { status: 200 });
}
