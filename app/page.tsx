import { RoleSelector } from "@/components/features/RoleSelector";
import { MentorCard } from "@/components/features/MentorCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { mentors } from "@/data/mentors";
import { careerPaths } from "@/data/careerPaths";
import { Card } from "@/components/ui/Card";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-100">
            Платформа студенческого наставничества
          </span>
          <div className="space-y-4">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Учёба, наставники и карьерный рост в одном спокойном пространстве.
            </h1>
            <p className="max-w-xl text-sm leading-6 text-slate-300 md:text-base">
              ПирЛифт помогает студентам находить помощь по предметам, а наставникам — строить
              репутацию, портфолио и подтверждённый волонтёрский вклад.
            </p>
          </div>
          <RoleSelector />
        </div>
        <Card className="border-cyan-400/20 bg-slate-950/60">
          <SectionTitle title="Быстрый обзор" description="Заготовка будущей платформы" />
          <div className="mt-6 grid gap-3 text-sm text-slate-200">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Поиск пары по предмету и цели</div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Сеансы, отзывы и часы волонтёрства</div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">Портфолио и сертификат будущего наставника</div>
          </div>
        </Card>
      </section>

      <section className="space-y-5">
        <SectionTitle title="Наставники" description="Примеры карточек для будущего каталога" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <SectionTitle title="Карьерные траектории" description="Примеры направлений роста" />
        <div className="grid gap-4 md:grid-cols-3">
          {careerPaths.map((path) => (
            <Card key={path.title} className="bg-white/5">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-white">{path.title}</h3>
                <p className="text-sm text-slate-300">{path.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
