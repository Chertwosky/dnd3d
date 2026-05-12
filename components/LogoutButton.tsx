"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogout() {
    setIsLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={handleLogout}
      className="rounded-lg border border-white/20 px-4 py-2 font-semibold text-white hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isLoading ? "Выходим..." : "Выйти"}
    </button>
  );
}
