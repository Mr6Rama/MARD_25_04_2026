import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function RequestPage() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Новый запрос" description="Заготовка формы будущего обращения" />
      <Card className="max-w-2xl">
        <div className="space-y-4 text-sm text-slate-300">
          <p>1. Укажите предмет и тему.</p>
          <p>2. Опишите уровень и цель помощи.</p>
          <p>3. Сохраните запрос для подбора наставника.</p>
        </div>
      </Card>
    </div>
  );
}
