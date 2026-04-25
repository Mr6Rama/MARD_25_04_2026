import Link from "next/link";
import type { Route } from "next";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ButtonProps = {
  href?: Route;
  children: ReactNode;
  className?: string;
};

export function Button({ href, children, className }: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-2.5 text-sm font-medium text-white shadow-glow transition hover:scale-[1.01] hover:opacity-95",
    className,
  );

  return href ? <Link href={href} className={classes}>{children}</Link> : <button type="button" className={classes}>{children}</button>;
}
