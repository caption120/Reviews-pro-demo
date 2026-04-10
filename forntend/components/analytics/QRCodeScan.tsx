export default function QRCodeScan() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-100 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
        </div>
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">+142 today</span>
      </div>

      <div>
        <p className="text-sm text-zinc-400 mb-1">QR Code Scans</p>
        <p className="text-3xl font-bold text-zinc-900">3,287</p>
      </div>

      <div className="flex items-center justify-between text-xs text-zinc-400 bg-zinc-50 rounded-xl px-3 py-2">
        <span>Unique <span className="font-semibold text-zinc-700">2,104</span></span>
        <div className="w-px h-3 bg-zinc-200" />
        <span>Repeat <span className="font-semibold text-zinc-700">1,183</span></span>
      </div>
    </div>
  );
}
