import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function SessionPage() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Сессия" description="План, заметки и результат одной встречи" />
      <Card className="max-w-3xl">
        <div className="grid gap-4 md:grid-cols-3 text-sm text-slate-300">
          <div>Входные данные</div>
          <div>Ход сессии</div>
          <div>Итог и следующий шаг</div>
        </div>
      </Card>
    </div>
  );
}
