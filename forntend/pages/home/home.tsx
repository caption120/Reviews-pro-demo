import GoogleRating from "@/components/analytics/GoogleRating";
import PageViews from "@/components/analytics/PageViews";
import QRCodeScan from "@/components/analytics/QRCodeScan";
import ResponseRate from "@/components/analytics/ResponseRate";
import GoalTracker from "@/components/analytics/GoalTracker";

export default function Home() {
  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900">Good morning! 👋</h1>
        <p className="text-zinc-500 mt-1">Here&apos;s what&apos;s happening with your business today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <GoogleRating />
        <PageViews />
        <QRCodeScan />
        <ResponseRate />
      </div>

      {/* Goal Tracker */}
      <div className="mt-5">
        <GoalTracker />
      </div>
    </div>
  );
}
