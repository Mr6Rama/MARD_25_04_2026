import { Sidebar } from "./Sidebar";
import type { ReactNode } from "react";

export function AppShell({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 min-w-0 px-6 py-8 md:px-10 lg:px-12">{children}</main>
      </div>
    </div>
  );
}
