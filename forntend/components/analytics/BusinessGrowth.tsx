export default function BusinessGrowth() {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const values = [30, 48, 42, 65, 58, 80];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-100 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
          <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+18% this month</span>
      </div>

      <div>
        <p className="text-sm text-zinc-400 mb-1">Business Growth</p>
        <p className="text-3xl font-bold text-zinc-900">$143,624</p>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-2 h-16">
        {values.map((v, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div
              className={`w-full rounded-md ${i === values.length - 1 ? "bg-emerald-500" : "bg-emerald-100"}`}
              style={{ height: `${v}%` }}
            />
            <span className="text-[10px] text-zinc-400">{months[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
