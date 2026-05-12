import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { AUTH_COOKIE_NAME } from "@/lib/auth-constants";

const PROTECTED_PAGES = ["/profile"];
const PUBLIC_API_PREFIXES = ["/api/auth/login", "/api/auth/register", "/api/auth/logout"];

function getSecret(): Uint8Array | null {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    return null;
  }

  return new TextEncoder().encode(secret);
}

async function hasValidSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value;
  const secret = getSecret();

  if (!token || !secret) {
    return false;
  }

  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedPage = PROTECTED_PAGES.some((path) => pathname.startsWith(path));
  const isProtectedApi = pathname.startsWith("/api/") && !PUBLIC_API_PREFIXES.some((path) => pathname.startsWith(path));

  if (!isProtectedPage && !isProtectedApi) {
    return NextResponse.next();
  }

  const isAuthenticated = await hasValidSession(request);

  if (isAuthenticated) {
    return NextResponse.next();
  }

  if (isProtectedApi) {
    return NextResponse.json({ message: "Требуется авторизация" }, { status: 401 });
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/profile/:path*", "/api/:path*"]
};
