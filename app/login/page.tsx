import { Suspense } from "react";
import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<div className="text-center text-slate-300">Загрузка формы входа...</div>}>
        <AuthForm mode="login" />
      </Suspense>
      <p className="text-center text-sm text-slate-300">
        Нет аккаунта? <Link href="/register" className="font-semibold text-indigo-300 hover:text-indigo-200">Зарегистрируйтесь</Link>.
      </p>
    </div>
  );
}
