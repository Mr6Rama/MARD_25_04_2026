import type { Metadata } from "next";
import { Almarai, Geist_Mono } from "next/font/google";
import "./globals.css";

const almarai = Almarai({
  weight: ["300", "400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-almarai",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prisma — Career Guidance Reimagined with AI",
  description:
    "Answer 4 questions. Get matched to careers, validate your fit, and receive your complete roadmap — universities, scholarships, internships, and a step-by-step action plan.",
  openGraph: {
    title: "Prisma — Career Guidance Reimagined with AI",
    description:
      "AI-powered career matching. Find your path in under 5 minutes.",
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
      className={`${almarai.variable} ${geistMono.variable}`}
    >
      <body className="min-h-[100dvh] bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
