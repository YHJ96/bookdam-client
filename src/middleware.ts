import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const cookie = await cookies();
  const accessToken = cookie.get('access')?.value;

  if (accessToken) return NextResponse.redirect(req.nextUrl.origin);

  return NextResponse.next();
}

export const config = {
  matcher: ['/login'],
};
