import { useEffect, useState } from "react";
import AddBusiness from "@/components/business/AddBusiness";
import BusinessCard, { Business } from "@/components/business/BusinessCard";
import BusinessDetailPanel from "@/components/business/BusinessDetailPanel";
const BACKEND_API = "http://localhost:5000/api";

export default function BusinessPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selected, setSelected] = useState<Business | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_API}/business`)
      .then((r) => r.json())
      .then((data: Business[]) => setBusinesses(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleRemove = async (placeId: string) => {
    await fetch(`${BACKEND_API}/business/${placeId}`, { method: "DELETE" }).catch(() => {});
    setBusinesses((prev) => prev.filter((b) => b.placeId !== placeId));
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Page header banner */}
      <div className="bg-gradient-to-br from-violet-600 to-indigo-700 px-6 md:px-10 pt-10 pb-8 relative overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-white/5" />
        <div className="absolute bottom-0 left-1/3 w-40 h-40 rounded-full bg-white/5" />

        <div className="relative flex items-center justify-between">
          <div>
            <p className="text-violet-200 text-sm font-medium mb-1">Dashboard</p>
            <h1 className="text-3xl font-bold text-white">My Businesses</h1>
            <p className="text-violet-200 mt-1.5 text-sm">
              Manage your listings and track performance
            </p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-5 py-3 bg-white text-violet-700 text-sm font-semibold rounded-2xl hover:bg-violet-50 transition-colors shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Business
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 md:px-10 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <svg className="w-7 h-7 animate-spin text-violet-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          </div>
        ) : businesses.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm font-semibold text-zinc-500 uppercase tracking-widest">
                Your listings
              </p>
              <span className="text-xs text-zinc-400">{businesses.length} total</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {businesses.map((b) => (
                <BusinessCard
                  key={b.placeId}
                  business={b}
                  onRemove={() => handleRemove(b.placeId)}
                  onViewDetails={() => setSelected(b)}
                />
              ))}
            </div>
          </>
        ) : (
          /* Empty state */
          <div className="bg-white rounded-3xl border border-dashed border-zinc-200 py-20 flex flex-col items-center justify-center shadow-sm">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center mb-5">
              <svg className="w-10 h-10 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-lg font-bold text-zinc-700">No businesses yet</p>
            <p className="text-sm text-zinc-400 mt-1.5 mb-7 text-center max-w-xs">
              Search and connect your Google Business listing to get started tracking performance
            </p>
            <button
              onClick={() => setShowAdd(true)}
              className="flex items-center gap-2 px-6 py-3 bg-violet-600 text-white text-sm font-semibold rounded-2xl hover:bg-violet-700 transition-colors shadow-md shadow-violet-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add Your First Business
            </button>
          </div>
        )}
      </div>

      {showAdd && (
        <AddBusiness
          onClose={() => setShowAdd(false)}
          onAdd={(b) => setBusinesses((prev) => [...prev, b])}
        />
      )}

      {selected && (
        <BusinessDetailPanel business={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
