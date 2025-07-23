import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  console.log(email, password);
  // Mock: chỉ đúng với email admin@example.com và password 123456
  if (email === "admin@example.com" && password === "123456") {
    return NextResponse.json({
      accessToken: "mocked-jwt-token",
    });
  }
  return NextResponse.json(
    { message: "Sai email hoặc mật khẩu!" },
    { status: 401 }
  );
}
