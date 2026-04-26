import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { opportunities } from "@/data/opportunities";

export default function MatchPage() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Подбор" description="Место для будущего матчинга запросов и наставников" />
      <div className="grid gap-4 md:grid-cols-2">
        {opportunities.map((item) => (
          <Card key={item.title}>
            <Badge>{item.level}</Badge>
            <h2 className="mt-4 text-xl font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{item.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
