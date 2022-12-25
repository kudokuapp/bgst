import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  if (!token) return;

  const { payload: whatsapp } = await jwtVerify(
    token!.value,
    new TextEncoder().encode(process.env.APP_SECRET)
  );

  if (whatsapp) return NextResponse.redirect(new URL('/t', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
};
