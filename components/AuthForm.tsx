"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type AuthMode = "login" | "register";

type AuthFormProps = {
  mode: AuthMode;
};

const content = {
  login: {
    title: "Вход",
    description: "Введите email и пароль, чтобы продолжить.",
    button: "Войти",
    endpoint: "/api/auth/login"
  },
  register: {
    title: "Регистрация",
    description: "Создайте аккаунт для доступа к защищённым разделам.",
    button: "Зарегистрироваться",
    endpoint: "/api/auth/register"
  }
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const copy = content[mode];

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const response = await fetch(copy.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    const data = await response.json().catch(() => null);

    setIsLoading(false);

    if (!response.ok) {
      setError(data?.message ?? "Не удалось выполнить запрос");
      return;
    }

    const next = searchParams.get("next") ?? "/profile";
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-5 rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">{copy.title}</h1>
        <p className="text-slate-300">{copy.description}</p>
      </div>
      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-200">Email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-indigo-400 transition focus:ring-2"
          placeholder="hero@example.com"
        />
      </label>
      <label className="block space-y-2">
        <span className="text-sm font-medium text-slate-200">Пароль</span>
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-lg border border-white/10 bg-slate-950/70 px-4 py-3 text-white outline-none ring-indigo-400 transition focus:ring-2"
          placeholder="Минимум 8 символов"
        />
      </label>
      {error ? <p className="rounded-lg bg-red-500/20 px-4 py-3 text-sm text-red-100">{error}</p> : null}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-indigo-500 px-5 py-3 font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? "Подождите..." : copy.button}
      </button>
    </form>
  );
}
