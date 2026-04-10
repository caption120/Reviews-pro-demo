import { useState } from "react";

const periodData = {
  "7days": { achieved: 18, label: "Last 7 Days" },
  month: { achieved: 68, label: "This Month" },
  year: { achieved: 430, label: "This Year" },
};

type Period = keyof typeof periodData;

export default function GoalTracker() {
  const [period, setPeriod] = useState<Period>("month");
  const [goal, setGoal] = useState({ "7days": 30, month: 100, year: 1000 });
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const currentGoal = goal[period];
  const achieved = periodData[period].achieved;
  const percentage = Math.min(Math.round((achieved / currentGoal) * 100), 100);
  const remaining = Math.max(currentGoal - achieved, 0);

  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const handleSetGoal = () => {
    const val = parseInt(inputValue);
    if (!isNaN(val) && val > 0) {
      setGoal((prev) => ({ ...prev, [period]: val }));
    }
    setEditing(false);
    setInputValue("");
  };

  const stats = [
    { label: "Achieved", value: achieved, color: "text-violet-600" },
    { label: "Remaining", value: remaining, color: "text-zinc-900" },
    { label: "Goal", value: currentGoal, color: "text-zinc-400" },
    { label: "Success Rate", value: `${percentage}%`, color: "text-emerald-600" },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-100 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-semibold text-zinc-900">Review Goal Tracker</h3>
          <p className="text-xs text-zinc-400 mt-0.5">Track your review target progress</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Period selector */}
          <div className="flex items-center bg-zinc-100 rounded-xl p-1 gap-1">
            {(["7days", "month", "year"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  period === p
                    ? "bg-white text-violet-600 shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700"
                }`}
              >
                {p === "7days" ? "7 Days" : p === "month" ? "Month" : "Year"}
              </button>
            ))}
          </div>

          {/* Set Goal button */}
          {editing ? (
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`${currentGoal}`}
                className="w-20 px-3 py-1.5 text-xs border border-violet-300 rounded-lg outline-none focus:ring-2 focus:ring-violet-200"
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleSetGoal()}
              />
              <button
                onClick={handleSetGoal}
                className="px-3 py-1.5 bg-violet-600 text-white text-xs font-medium rounded-lg hover:bg-violet-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => { setEditing(false); setInputValue(""); }}
                className="px-3 py-1.5 bg-zinc-100 text-zinc-500 text-xs font-medium rounded-lg hover:bg-zinc-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => { setEditing(true); setInputValue(String(currentGoal)); }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 text-violet-600 text-xs font-medium rounded-xl hover:bg-violet-100 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Set Goal
            </button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
        {/* Circle */}
        <div className="relative w-36 h-36 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r={radius} fill="none" stroke="#f4f4f5" strokeWidth="10" />
            <circle
              cx="60" cy="60" r={radius}
              fill="none"
              stroke="url(#goalGradient)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: "stroke-dashoffset 0.6s ease" }}
            />
            <defs>
              <linearGradient id="goalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-zinc-900">{percentage}%</span>
            <span className="text-xs text-zinc-400">{periodData[period].label}</span>
          </div>
        </div>

        {/* Stat boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full md:flex-1">
          {stats.map((s) => (
            <div key={s.label} className="bg-zinc-50 rounded-xl px-4 py-4 flex flex-col gap-1">
              <span className="text-xs text-zinc-400">{s.label}</span>
              <span className={`text-2xl font-bold ${s.color}`}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-6">
        <div className="flex justify-between mb-2">
          <span className="text-xs text-zinc-400">Overall Progress</span>
          <span className="text-xs font-medium text-zinc-600">{achieved} of {currentGoal} reviews</span>
        </div>
        <div className="w-full bg-zinc-100 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
