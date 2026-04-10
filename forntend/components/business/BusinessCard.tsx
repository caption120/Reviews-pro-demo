export type Business = {
  placeId: string;
  name: string;
  address: string;
  rating: number;
  category: string;
};

type Props = {
  business: Business;
  onRemove: () => void;
  onViewDetails: () => void;
};

export default function BusinessCard({ business, onRemove, onViewDetails }: Props) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100">
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            {business.name[0]}
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900">{business.name}</h3>
            <p className="text-xs text-zinc-400 mt-0.5 capitalize">{business.category}</p>
          </div>
        </div>
        <button
          onClick={onRemove}
          className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-red-50 hover:text-red-500 text-zinc-400 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="h-px bg-zinc-100 mb-5" />

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-zinc-50 rounded-xl p-3">
          <p className="text-xs text-zinc-400 mb-1">Address</p>
          <p className="text-sm font-medium text-zinc-800 truncate">{business.address}</p>
        </div>
        <div className="bg-zinc-50 rounded-xl p-3">
          <p className="text-xs text-zinc-400 mb-1">Category</p>
          <p className="text-sm font-medium text-zinc-800 capitalize">{business.category}</p>
        </div>
        <div className="bg-zinc-50 rounded-xl p-3">
          <p className="text-xs text-zinc-400 mb-1">Google Rating</p>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-lg font-bold text-yellow-500">{business.rating}</span>
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>
        <div className="bg-zinc-50 rounded-xl p-3">
          <p className="text-xs text-zinc-400 mb-1">Place ID</p>
          <p className="text-xs font-mono text-violet-600 truncate">{business.placeId}</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full">Active</span>
        <button
          onClick={onViewDetails}
          className="text-xs text-violet-600 bg-violet-50 px-3 py-1.5 rounded-xl font-medium hover:bg-violet-100 transition-colors"
        >
          View Details
        </button>
      </div>
    </div>
  );
}
