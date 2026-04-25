import { Header } from "./Header";
import type { ReactNode } from "react";

export function AppShell({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen text-slate-100">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
