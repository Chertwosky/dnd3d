import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { LogoutButton } from "@/components/LogoutButton";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/profile");
  }

  return (
    <section className="mx-auto max-w-2xl space-y-6 rounded-2xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-300">Профиль</p>
          <h1 className="mt-2 text-3xl font-bold text-white">{user.email}</h1>
        </div>
        <LogoutButton />
      </div>
      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-slate-950/60 p-4">
          <dt className="text-sm text-slate-400">ID пользователя</dt>
          <dd className="mt-1 break-all font-mono text-sm text-slate-100">{user.id}</dd>
        </div>
        <div className="rounded-xl bg-slate-950/60 p-4">
          <dt className="text-sm text-slate-400">Роль</dt>
          <dd className="mt-1 text-lg font-semibold text-white">{user.role}</dd>
        </div>
      </dl>
      <p className="text-sm text-slate-300">
        Эта страница доступна только пользователям с действительным JWT-cookie. Роли USER и ADMIN готовы для дальнейшего разграничения доступа.
      </p>
    </section>
  );
}
