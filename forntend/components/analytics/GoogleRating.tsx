export default function GoogleRating() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-zinc-100 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5" fill="none">
            <path d="M21.805 10.023H12v4.05h5.617c-.24 1.27-.97 2.348-2.07 3.07v2.55h3.35c1.96-1.807 3.09-4.474 3.09-7.635 0-.51-.046-1.003-.182-1.035z" fill="#4285F4"/>
            <path d="M12 22c2.7 0 4.965-.895 6.618-2.43l-3.35-2.55c-.895.6-2.04.955-3.268.955-2.513 0-4.64-1.697-5.404-3.98H3.136v2.63A9.998 9.998 0 0 0 12 22z" fill="#34A853"/>
            <path d="M6.596 13.995A6.025 6.025 0 0 1 6.28 12c0-.69.12-1.357.316-1.995V7.375H3.136A9.998 9.998 0 0 0 2 12c0 1.614.386 3.14 1.136 4.625l3.46-2.63z" fill="#FBBC05"/>
            <path d="M12 5.975c1.415 0 2.684.487 3.685 1.44l2.76-2.76C16.96 3.09 14.695 2 12 2A9.998 9.998 0 0 0 3.136 7.375l3.46 2.63C7.36 7.672 9.487 5.975 12 5.975z" fill="#EA4335"/>
          </svg>
        </div>
        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+0.2 this month</span>
      </div>

      <div>
        <p className="text-sm text-zinc-400 mb-1">Google Rating</p>
        <p className="text-3xl font-bold text-zinc-900">4.8</p>
      </div>

      <div className="flex items-center gap-1">
        {[1,2,3,4,5].map((i) => (
          <svg key={i} className={`w-4 h-4 ${i <= 5 ? "text-yellow-400" : "text-zinc-200"}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
        ))}
        <span className="text-xs text-zinc-400 ml-1">1,243 reviews</span>
      </div>
    </div>
  );
}
