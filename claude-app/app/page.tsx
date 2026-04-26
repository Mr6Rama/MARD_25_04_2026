import { PrismaHero } from "@/components/ui/prisma-hero";
import HowItWorksSection from "@/components/sections/how-it-works";

export default function Home() {
  return (
    <main className="flex flex-col w-full" style={{ backgroundColor: "#0a0a0a" }}>
      <PrismaHero />
      <HowItWorksSection />
    </main>
  );
}
