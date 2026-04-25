import Link from "next/link";
import type { Route } from "next";

const links = [
  { href: "/student", label: "Студентам" },
  { href: "/mentor", label: "Наставникам" },
  { href: "/request", label: "Запрос" },
  { href: "/match", label: "Подбор" },
  { href: "/dashboard", label: "Панель" },
] as const satisfies ReadonlyArray<{ href: Route; label: string }>;

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-semibold text-white">
          ПирЛифт
        </Link>
        <nav className="flex flex-wrap gap-2 text-sm text-slate-300">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-full px-3 py-1.5 transition hover:bg-white/10 hover:text-white">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
