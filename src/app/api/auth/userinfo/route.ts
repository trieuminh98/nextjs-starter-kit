import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization");
  // Kiểm tra Bearer token (mock: chỉ chấp nhận 'mocked-jwt-token')
  if (
    auth &&
    auth.startsWith("Bearer ") &&
    auth.split(" ")[1] === "mocked-jwt-token"
  ) {
    return NextResponse.json({
      id: 1,
      email: "admin@example.com",
      name: "Admin User",
      role: "admin",
    });
  }
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}
