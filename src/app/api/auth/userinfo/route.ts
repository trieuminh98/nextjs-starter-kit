import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Delay 5s
  await new Promise((resolve) => setTimeout(resolve, 500));
  const auth = req.headers.get('authorization');
  if (auth && auth.startsWith('Bearer ') && auth.split(' ')[1] === 'mocked-jwt-token') {
    return NextResponse.json({
      id: 1,
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
    });
  }
  return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
}
