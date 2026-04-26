import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import type { Mentor } from "@/types/mentor";

export function MentorCard({ mentor }: Readonly<{ mentor: Mentor }>) {
  return (
    <Card>
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-medium text-white">{mentor.name}</h3>
            <p className="text-sm text-slate-300">{mentor.university}</p>
          </div>
          <Badge>{mentor.subject}</Badge>
        </div>
        <p className="text-sm text-slate-300">{mentor.bio}</p>
      </div>
    </Card>
  );
}
