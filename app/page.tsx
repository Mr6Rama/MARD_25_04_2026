import { PrismaHero } from "@/components/ui/prisma-hero";
import { AboutSection } from "@/components/sections/about";
import { FeaturesSection } from "@/components/sections/features";

export default function Home() {
  return (
    <main className="flex flex-col w-full bg-black">
      <PrismaHero />
      <AboutSection />
      <FeaturesSection />
    </main>
  );
}
