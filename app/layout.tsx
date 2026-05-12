import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "DnD3D",
  description: "DnD3D MVP application"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <header className="border-b border-white/10 bg-slate-950/60 backdrop-blur">
          <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-xl font-bold text-white">
              DnD3D
            </Link>
            <div className="flex items-center gap-4 text-sm text-slate-200">
              <Link href="/login" className="hover:text-white">
                Вход
              </Link>
              <Link href="/register" className="hover:text-white">
                Регистрация
              </Link>
              <Link href="/profile" className="rounded-full bg-indigo-500 px-4 py-2 font-medium text-white hover:bg-indigo-400">
                Профиль
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-12">{children}</main>
      </body>
    </html>
  );
}
