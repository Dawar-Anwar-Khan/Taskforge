import { NextResponse } from "next/server";

export async function GET() {
  // Placeholder implementation. Replace with real auth-backed data when available.
  const user = {
    id: "1",
    name: "John Employee",
    role: "Employee",
  };

  return NextResponse.json(user);
}

