import type { Metadata } from "next";
<<<<<<< HEAD
import { Almarai, Spectral, Geist_Mono } from "next/font/google";
import "./globals.css";

const almarai = Almarai({
  weight: ["300", "400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-almarai",
  display: "swap",
});

const spectral = Spectral({
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-spectral",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prisma — Your Life Navigation Engine",
  description:
    "Prisma is an AI-powered system that guides you through career discovery, financial pathway planning, and real-world talent packaging — turning potential into structured opportunity.",
  openGraph: {
    title: "Prisma — Your Life Navigation Engine",
    description:
      "AI-powered life navigation. Career mapping, financial clarity, and talent packaging — all in one structured system.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${almarai.variable} ${spectral.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">{children}</body>
=======
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
>>>>>>> 078473e3bd9fa783777c0e85e195e0c823324cf0
    </html>
  );
}
