import { Card } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { mentors } from "@/data/mentors";
import { MentorCard } from "@/components/features/MentorCard";

export default function MentorPage() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Наставникам" description="Зона роста, доверия и будущего портфолио" />
      <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
        <Card>
          <h2 className="text-2xl font-semibold text-white">Что появится позже</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>• Верифицированные часы волонтёрства</li>
            <li>• Рейтинги и отзывы студентов</li>
            <li>• Сертификат и портфолио достижений</li>
          </ul>
        </Card>
        <div className="grid gap-4 md:grid-cols-2">
          {mentors.slice(0, 2).map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </div>
    </div>
  );
}
