import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authSchema } from "@/lib/validation";
import { AUTH_COOKIE_NAME, createSessionToken, sessionCookieOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const parsed = authSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.issues[0]?.message ?? "Некорректные данные регистрации" },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: { id: true }
  });

  if (existingUser) {
    return NextResponse.json({ message: "Пользователь с таким email уже зарегистрирован" }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  const user = await prisma.user.create({
    data: {
      email: parsed.data.email,
      passwordHash
    },
    select: {
      id: true,
      email: true,
      role: true
    }
  });

  const token = await createSessionToken(user);
  const response = NextResponse.json({ user }, { status: 201 });
  response.cookies.set(AUTH_COOKIE_NAME, token, sessionCookieOptions());

  return response;
}
