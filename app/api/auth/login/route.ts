import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authSchema } from "@/lib/validation";
import { AUTH_COOKIE_NAME, createSessionToken, sessionCookieOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const parsed = authSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json({ message: "Введите email и пароль" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: {
      id: true,
      email: true,
      role: true,
      passwordHash: true
    }
  });

  if (!user) {
    return NextResponse.json({ message: "Неверный email или пароль" }, { status: 401 });
  }

  const isValidPassword = await bcrypt.compare(parsed.data.password, user.passwordHash);

  if (!isValidPassword) {
    return NextResponse.json({ message: "Неверный email или пароль" }, { status: 401 });
  }

  const authUser = {
    id: user.id,
    email: user.email,
    role: user.role
  };
  const token = await createSessionToken(authUser);
  const response = NextResponse.json({ user: authUser });
  response.cookies.set(AUTH_COOKIE_NAME, token, sessionCookieOptions());

  return response;
}
