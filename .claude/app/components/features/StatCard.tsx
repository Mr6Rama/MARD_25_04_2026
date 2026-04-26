import { Card } from "@/components/ui/Card";

type Props = {
  label: string;
  value: string;
  hint: string;
};

export function StatCard({ label, value, hint }: Props) {
  return (
    <Card>
      <p className="text-sm text-slate-400">{label}</p>
      <div className="mt-2 text-3xl font-semibold text-white">{value}</div>
      <p className="mt-2 text-sm text-slate-300">{hint}</p>
    </Card>
  );
}
