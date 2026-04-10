export default function TemplatePage() {
  const templates = [
    { title: "Review Request", desc: "Ask customers to leave a review after purchase.", tag: "Email" },
    { title: "Follow Up", desc: "Follow up with customers who haven't left a review yet.", tag: "SMS" },
    { title: "Thank You", desc: "Thank customers who left a positive review.", tag: "Email" },
    { title: "QR Code Card", desc: "Print a QR code card to hand out in store.", tag: "Print" },
  ];

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Templates</h1>
        <p className="text-zinc-500 mt-1">Ready-made templates to help you collect more reviews.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {templates.map((t) => (
          <div key={t.title} className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-100 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-violet-600 bg-violet-50 px-2 py-1 rounded-full">{t.tag}</span>
            </div>
            <h3 className="text-base font-semibold text-zinc-900">{t.title}</h3>
            <p className="text-sm text-zinc-400 flex-1">{t.desc}</p>
            <button className="w-full mt-1 py-2 rounded-xl bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-700 transition-colors">
              Use Template
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
