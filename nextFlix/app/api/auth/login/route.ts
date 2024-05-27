import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const request = await req.json();
    return NextResponse.json({ message: "Topic Created" }, { status: 201 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e }, { status: 201 });
  }
}
