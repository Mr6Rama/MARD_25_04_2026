import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Портфолио" description="Черновик цифрового сертификата наставника" />
      <Card className="max-w-3xl border-violet-400/20 bg-gradient-to-br from-white/10 to-white/5">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-200/80">ПирЛифт</p>
        <h2 className="mt-4 text-3xl font-semibold text-white">Сертификат наставника</h2>
        <p className="mt-3 max-w-xl text-sm text-slate-300">
          Здесь позже появятся часы, отзывы, направления помощи и визуальный профиль достижений.
        </p>
      </Card>
    </div>
  );
}
