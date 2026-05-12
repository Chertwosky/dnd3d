import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-8">
      <div className="max-w-2xl space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">MVP авторизация</p>
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Добро пожаловать в DnD3D</h1>
        <p className="text-lg text-slate-300">
          Зарегистрируйтесь или войдите, чтобы перейти к защищённым возможностям приложения и профилю пользователя.
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        <Link href="/register" className="rounded-lg bg-indigo-500 px-5 py-3 font-semibold text-white hover:bg-indigo-400">
          Создать аккаунт
        </Link>
        <Link href="/login" className="rounded-lg border border-white/20 px-5 py-3 font-semibold text-white hover:bg-white/10">
          Войти
        </Link>
      </div>
    </section>
  );
}
