type Props = {
  title: string;
  description?: string;
};

export function SectionTitle({ title, description }: Props) {
  return (
    <div className="space-y-1">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      {description ? <p className="text-sm text-slate-300">{description}</p> : null}
    </div>
  );
}
