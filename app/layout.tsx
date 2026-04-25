import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "ПирЛифт / Кадам Наставник",
  description: "Футуристичная база для студенческого наставничества",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
