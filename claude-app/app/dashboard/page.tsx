import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { StatCard } from "@/components/features/StatCard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Панель" description="Сводка будущих метрик платформы" />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Запросы" value="12" hint="Ожидают подбора" />
        <StatCard label="Сеансы" value="4" hint="Запланированы на неделе" />
        <StatCard label="Часы" value="28" hint="Подтверждённый вклад" />
      </div>
    </div>
  );
}
