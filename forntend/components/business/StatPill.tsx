type Props = {
  label: string;
  value: string | number;
  color: string;
};

export default function StatPill({ label, value, color }: Props) {
  return (
    <div className="bg-white rounded-2xl px-5 py-4 shadow-sm border border-zinc-100 flex flex-col gap-1">
      <p className="text-xs text-zinc-400 font-medium">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
