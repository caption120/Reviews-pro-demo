import type { AppProps } from "next/app";
import Sidebar from "@/components/navbar/Sidebar";
import "@/app/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <Sidebar />
      <main className="flex-1 pt-14 lg:pt-0 overflow-x-hidden">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
