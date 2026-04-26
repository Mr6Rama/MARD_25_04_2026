import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function StudentPage() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Студентам" description="Быстрый путь к учебной поддержке" />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <Badge>Поддержка</Badge>
          <h2 className="mt-4 text-2xl font-semibold text-white">Сформулируйте запрос</h2>
          <p className="mt-2 text-sm text-slate-300">
            Оставьте предмет, тему и желаемый формат помощи. Позже здесь появится умный подбор наставника.
          </p>
        </Card>
        <Card>
          <Badge>Маршрут</Badge>
          <h2 className="mt-4 text-2xl font-semibold text-white">Выберите следующий шаг</h2>
          <p className="mt-2 text-sm text-slate-300">
            Запрос, подбор, сессия и итоговый отзыв будут связаны в простой цепочке.
          </p>
        </Card>
      </div>
    </div>
  );
}
