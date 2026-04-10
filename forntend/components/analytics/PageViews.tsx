export default function PageViews() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-100 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center">
          <svg className="w-5 h-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12% today</span>
      </div>

      <div>
        <p className="text-sm text-zinc-400 mb-1">Page Views</p>
        <p className="text-3xl font-bold text-zinc-900">32,910</p>
      </div>

      <div className="flex items-end gap-1 h-8">
        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
          <div key={i} className="flex-1 rounded-sm bg-violet-100" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}
