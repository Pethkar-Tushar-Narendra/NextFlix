import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import { hashPassword } from "@/Components/Functions";
import Users from "@/models/users";

// Get list will provide list of movies by checking request data
export async function POST(request: Request) {
  try {
    const { userName, password, email } = await request.json();
    await connectMongoDB();
    const encryptedPassword = await hashPassword(password);
    await Users.create({ userName, password: encryptedPassword, email });
    return NextResponse.json({ message: "User Registered" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 201 });
  }
}
