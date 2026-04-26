import type { Metadata } from "next";
import { OnboardFlow } from "./OnboardFlow";

export const metadata: Metadata = {
  title: "Discover Your Path — Prisma",
  description:
    "Start your Prisma journey. Three focused steps to map your career, finances, and first milestone.",
};

export default function OnboardPage() {
  return <OnboardFlow />;
}
