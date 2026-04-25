"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Главная" },
  { href: "/request", label: "Запрос помощи" },
  { href: "/match", label: "Наставники" },
  { href: "/session", label: "Сессия" },
  { href: "/dashboard", label: "Кабинет" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/request", label: "Возможности" },
  { href: "/", label: "О проекте" },
] as const satisfies ReadonlyArray<{ href: Route; label: string }>;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-slate-950 md:flex">
      <div className="flex min-h-screen flex-col gap-6 px-3 py-4">
        <div className="shrink-0">
          <Link href="/" className="block">
            <p className="text-sm font-semibold tracking-wide text-white">ПирЛифт</p>
            <p className="text-xs text-slate-400">Qadam Mentor</p>
          </Link>
        </div>

        <nav className="flex min-w-0 flex-1 flex-col gap-2 overflow-y-auto">
          {items.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname === item.href;

            return (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className={cn(
                  "relative flex w-full items-center rounded-xl px-3 py-2 text-sm transition",
                  active
                    ? "bg-indigo-600/15 text-white before:absolute before:left-0 before:top-2 before:h-6 before:w-1 before:rounded-full before:bg-indigo-400"
                    : "text-slate-400 hover:bg-white/5 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 px-3 py-3">
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <div>
              <p className="text-sm font-medium text-white">Данияр Н.</p>
              <p className="text-xs text-slate-400">Наставник</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
