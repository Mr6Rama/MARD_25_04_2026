import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Badge({ children, className }: Readonly<{ children: ReactNode; className?: string }>) {
  return <span className={cn("inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-100", className)}>{children}</span>;
}
