import { useEffect, useRef, useState } from "react";

const BACKEND_API = "http://localhost:5000/api";
const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_PLACE_API!;

type Business = {
  placeId: string;
  name: string;
  address: string;
  rating: number;
  category: string;
};

type Props = {
  onClose: () => void;
  onAdd: (business: Business) => void;
};

// Load the Maps JS + Places library once
function loadMapsScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return;
    if ((window as Window & { google?: unknown }).google) { resolve(); return; }
    const existing = document.getElementById("gmaps-script");
    if (existing) { existing.addEventListener("load", () => resolve()); return; }
    const script = document.createElement("script");
    script.id = "gmaps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${MAPS_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps script"));
    document.head.appendChild(script);
  });
}

export default function AddBusiness({ onClose, onAdd }: Props) {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [results, setResults] = useState<Business[]>([]);
  const [selected, setSelected] = useState<Business | null>(null);
  const [error, setError] = useState("");
  const mapDivRef = useRef<HTMLDivElement>(null);

  // Pre-load the script when the modal mounts
  useEffect(() => {
    loadMapsScript().catch(() => {});
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(false);
    setError("");
    setSelected(null);
    setResults([]);

    try {
      await loadMapsScript();

      const g = (window as Window & typeof globalThis & {
        google: {
          maps: {
            places: {
              PlacesService: new (el: HTMLElement) => {
                textSearch: (
                  req: { query: string },
                  cb: (
                    results: Array<{
                      place_id?: string;
                      name?: string;
                      formatted_address?: string;
                      rating?: number;
                      types?: string[];
                    }> | null,
                    status: string
                  ) => void
                ) => void;
              };
              PlacesServiceStatus: { OK: string };
            };
          };
        };
      }).google;

      const service = new g.maps.places.PlacesService(mapDivRef.current!);

      service.textSearch({ query }, (res, status) => {
        setLoading(false);
        setSearched(true);

        if (status !== g.maps.places.PlacesServiceStatus.OK || !res) {
          if (status === "REQUEST_DENIED") {
            setError("API key error: enable the Places API in Google Cloud Console.");
          } else if (status === "ZERO_RESULTS") {
            setResults([]);
          } else {
            setError(`Google Places error: ${status}`);
          }
          return;
        }

        const mapped: Business[] = res.slice(0, 6).map((p) => ({
          placeId:  p.place_id ?? "",
          name:     p.name ?? "",
          address:  p.formatted_address ?? "",
          rating:   p.rating ?? 0,
          category: p.types?.[0]?.replace(/_/g, " ") ?? "",
        }));

        setResults(mapped);
      });
    } catch {
      setLoading(false);
      setSearched(true);
      setError("Could not load Google Maps. Check your API key.");
    }
  };

  const handleConfirm = async () => {
    if (!selected) return;
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`${BACKEND_API}/business`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selected),
      });
      if (res.status === 409) {
        setError("This business is already added.");
        setSaving(false);
        return;
      }
      if (!res.ok) throw new Error("Failed to save");
      const saved: Business = await res.json();
      onAdd(saved);
      onClose();
    } catch {
      setError("Failed to save. Make sure the backend is running.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* Hidden div required by PlacesService */}
      <div ref={mapDivRef} style={{ display: "none" }} />

      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden">

          {/* Header */}
          <div className="relative bg-gradient-to-br from-violet-600 via-violet-600 to-indigo-700 px-8 pt-8 pb-14">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/4" />

            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/15 flex items-center justify-center hover:bg-white/25 transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center gap-4 relative">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Add Your Business</h2>
                <p className="text-sm text-violet-200 mt-0.5">Search by name to find and connect your listing</p>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="px-8 -mt-6 relative z-10">
            <div className="bg-white rounded-2xl shadow-xl border border-zinc-100 flex items-center gap-2 p-2">
              <div className="flex items-center gap-3 flex-1 px-3">
                <svg className="w-5 h-5 text-violet-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="e.g. The Coffee House, NYC..."
                  className="flex-1 py-2.5 text-sm text-zinc-800 outline-none placeholder:text-zinc-400 bg-transparent"
                  autoFocus
                />
                {query && (
                  <button onClick={() => { setQuery(""); setResults([]); setSearched(false); setError(""); }}>
                    <svg className="w-4 h-4 text-zinc-300 hover:text-zinc-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              <button
                onClick={handleSearch}
                disabled={!query.trim() || loading}
                className="px-5 py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 flex-shrink-0"
              >
                {loading ? (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                )}
                {loading ? "Searching…" : "Search"}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mx-8 mt-4 flex items-center gap-3 px-4 py-3 bg-red-50 border border-red-100 rounded-2xl">
              <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
              <p className="text-xs text-red-600 font-medium">{error}</p>
            </div>
          )}

          {/* Results */}
          <div className="px-8 pt-5 pb-3 max-h-72 overflow-y-auto">
            {!searched && !loading && !error && (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center mb-3">
                  <svg className="w-7 h-7 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-zinc-500">Search for your business</p>
                <p className="text-xs text-zinc-400 mt-1">Type a name above and press Search</p>
              </div>
            )}

            {searched && results.length === 0 && !error && (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-zinc-50 flex items-center justify-center mb-3">
                  <svg className="w-7 h-7 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-zinc-600">No results found</p>
                <p className="text-xs text-zinc-400 mt-1">Try a different name or check your spelling</p>
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              {results.map((b) => (
                <button
                  key={b.placeId}
                  onClick={() => setSelected(b)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all border-2 ${
                    selected?.placeId === b.placeId
                      ? "border-violet-400 bg-violet-50 shadow-sm shadow-violet-100"
                      : "border-transparent bg-zinc-50 hover:bg-zinc-100 hover:border-zinc-200"
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white font-bold text-base flex-shrink-0 shadow-md shadow-violet-200">
                    {b.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-zinc-900 truncate">{b.name}</p>
                    <p className="text-xs text-zinc-400 truncate mt-0.5">{b.address}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs text-violet-600 bg-violet-100 px-2.5 py-0.5 rounded-full font-medium capitalize">{b.category}</span>
                      {b.rating > 0 && (
                        <div className="flex items-center gap-0.5">
                          <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs text-yellow-600 font-semibold">{b.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                    selected?.placeId === b.placeId ? "bg-violet-600 border-violet-600" : "border-zinc-300"
                  }`}>
                    {selected?.placeId === b.placeId && (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 border-t border-zinc-100 flex items-center justify-between gap-4 bg-zinc-50/50">
            {selected ? (
              <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-zinc-700 font-medium truncate">{selected.name}</p>
              </div>
            ) : (
              <p className="text-sm text-zinc-400 flex-1">No business selected</p>
            )}
            <div className="flex gap-2.5 flex-shrink-0">
              <button
                onClick={onClose}
                className="px-5 py-2.5 text-sm text-zinc-600 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-100 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={!selected || saving}
                className="px-5 py-2.5 text-sm text-white bg-violet-600 rounded-xl hover:bg-violet-700 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed font-medium flex items-center gap-2 shadow-md shadow-violet-200"
              >
                {saving && (
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                )}
                {saving ? "Saving…" : "Add Business"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
