import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Route } from "next";

const roles = [
  { title: "Я студент", href: "/student", text: "Найти помощь и оформить запрос" },
  { title: "Я наставник", href: "/mentor", text: "Помогать и накапливать портфолио" },
] as const satisfies ReadonlyArray<{ title: string; href: Route; text: string }>;

export function RoleSelector() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {roles.map((role) => (
        <Card key={role.title} className="bg-slate-950/50">
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-white">{role.title}</h3>
            <p className="text-sm text-slate-300">{role.text}</p>
            <Button href={role.href}>Открыть</Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
