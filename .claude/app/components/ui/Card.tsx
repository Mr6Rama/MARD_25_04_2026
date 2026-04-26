import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Card({ children, className }: Readonly<{ children: ReactNode; className?: string }>) {
  return <div className={cn("rounded-3xl border border-white/10 bg-white/5 p-5 shadow-glow backdrop-blur", className)}>{children}</div>;
}
