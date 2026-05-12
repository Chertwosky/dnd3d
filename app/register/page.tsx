import { Suspense } from "react";
import Link from "next/link";
import { AuthForm } from "@/components/AuthForm";

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<div className="text-center text-slate-300">Загрузка формы регистрации...</div>}>
        <AuthForm mode="register" />
      </Suspense>
      <p className="text-center text-sm text-slate-300">
        Уже есть аккаунт? <Link href="/login" className="font-semibold text-indigo-300 hover:text-indigo-200">Войдите</Link>.
      </p>
    </div>
  );
}
