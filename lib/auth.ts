import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import type { Role } from "@prisma/client";
import { AUTH_COOKIE_NAME, TOKEN_TTL } from "@/lib/auth-constants";

export { AUTH_COOKIE_NAME, TOKEN_TTL };

export type AuthUser = {
  id: string;
  email: string;
  role: Role;
};

type SessionPayload = AuthUser & {
  iat?: number;
  exp?: number;
};

export function getJwtSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error("JWT_SECRET must be set and contain at least 32 characters.");
  }

  return new TextEncoder().encode(secret);
}

export async function createSessionToken(user: AuthUser): Promise<string> {
  return new SignJWT({ email: user.email, role: user.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(user.id)
    .setIssuedAt()
    .setExpirationTime(TOKEN_TTL)
    .sign(getJwtSecret());
}

export async function verifySessionToken(token: string): Promise<AuthUser | null> {
  try {
    const { payload } = await jwtVerify<SessionPayload>(token, getJwtSecret());

    if (!payload.sub || !payload.email || !payload.role) {
      return null;
    }

    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role
    };
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  };
}
