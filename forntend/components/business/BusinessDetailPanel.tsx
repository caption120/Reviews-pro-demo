import { Business } from "./BusinessCard";

type Props = {
  business: Business;
  onClose: () => void;
};

export default function BusinessDetailPanel({ business, onClose }: Props) {
  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden">
          <div className="bg-gradient-to-br from-violet-600 to-indigo-600 px-6 pt-6 pb-10 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-white text-2xl font-bold mb-3">
              {business.name[0]}
            </div>
            <h2 className="text-xl font-bold text-white">{business.name}</h2>
            <p className="text-sm text-violet-200 mt-1 capitalize">{business.category}</p>
          </div>

          <div className="px-6 -mt-5">
            <div className="bg-white rounded-2xl shadow-lg border border-zinc-100 divide-y divide-zinc-100">
              <div className="flex items-center gap-3 px-4 py-3">
                <svg className="w-4 h-4 text-violet-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-zinc-700">{business.address}</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3">
                <svg className="w-4 h-4 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-sm text-zinc-700 font-medium">{business.rating} / 5.0 Google Rating</span>
              </div>
              <div className="flex items-start gap-3 px-4 py-3">
                <svg className="w-4 h-4 text-violet-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                <span className="text-xs font-mono text-violet-600 break-all">{business.placeId}</span>
              </div>
            </div>
          </div>

          <div className="px-6 py-5 flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">Active</span>
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-zinc-500 bg-zinc-100 rounded-xl hover:bg-zinc-200 transition-colors">
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
