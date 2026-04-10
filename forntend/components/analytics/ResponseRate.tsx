export default function ResponseRate() {
  const rate = 68;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-100 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
          <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+5% this month</span>
      </div>

      <div>
        <p className="text-sm text-zinc-400 mb-1">Response Rate</p>
        <p className="text-3xl font-bold text-zinc-900">{rate}%</p>
      </div>

      {/* Progress bar */}
      <div>
        <div className="w-full bg-zinc-100 rounded-full h-2">
          <div
            className="bg-emerald-500 h-2 rounded-full transition-all"
            style={{ width: `${rate}%` }}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-xs text-zinc-400">0%</span>
          <span className="text-xs text-zinc-400">100%</span>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-400 bg-zinc-50 rounded-xl px-3 py-2">
        <span>Sent <span className="font-semibold text-zinc-700">1,243</span></span>
        <div className="w-px h-3 bg-zinc-200" />
        <span>Replied <span className="font-semibold text-zinc-700">845</span></span>
      </div>
    </div>
  );
}
