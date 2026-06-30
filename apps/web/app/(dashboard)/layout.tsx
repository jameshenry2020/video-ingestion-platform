"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Film, Upload, Grid, Radio, AlertCircle } from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [apiStatus, setApiStatus] = React.useState<"checking" | "online" | "offline">("checking");

  React.useEffect(() => {
    const verifyBackend = async () => {
      try {
        await api.get("/videos");
        setApiStatus("online");
      } catch (err) {
        console.warn("Backend connectivity check failed:", err);
        setApiStatus("offline");
      }
    };

    verifyBackend();
    const timer = setInterval(verifyBackend, 15000); // Check connectivity every 15s
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#030408] text-[#f8fafc] flex flex-col relative">
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full glow-spot-1 pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] rounded-full glow-spot-2 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] rounded-full glow-spot-3 pointer-events-none" />
      
      {/* Ambient Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      {/* Top Floating Glassmorphic Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/[0.04] bg-[#030408]/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Premium Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg shadow-indigo-500/10 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                <Film className="h-5.5 w-5.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-400 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
                  AetherMedia
                </span>
                <span className="text-[9px] font-bold tracking-widest text-indigo-400/80 uppercase">
                  Transcoding Studio
                </span>
              </div>
            </Link>

            {/* Navigation links */}
            <nav className="hidden md:flex items-center gap-1.5">
              <Link href="/">
                <Button
                  variant="ghost"
                  className={`relative gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-300 ${
                    pathname === "/" 
                      ? "text-white bg-white/[0.04] shadow-inner" 
                      : "text-slate-400 hover:text-white hover:bg-white/[0.02]"
                  }`}
                >
                  <Grid className="h-4 w-4" />
                  Dashboard
                  {pathname === "/" && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                  )}
                </Button>
              </Link>
              <Link href="/upload">
                <Button
                  variant="ghost"
                  className={`relative gap-2 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-300 ${
                    pathname === "/upload" 
                      ? "text-white bg-white/[0.04] shadow-inner" 
                      : "text-slate-400 hover:text-white hover:bg-white/[0.02]"
                  }`}
                >
                  <Upload className="h-4 w-4" />
                  Upload Video
                  {pathname === "/upload" && (
                    <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                  )}
                </Button>
              </Link>
            </nav>
          </div>

          {/* Connection Status Badge */}
          <div className="flex items-center gap-3">
            {apiStatus === "checking" && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-400 border border-slate-500/15">
                <span className="h-2 w-2 rounded-full bg-slate-500 animate-pulse" />
                Connecting API
              </div>
            )}
            {apiStatus === "online" && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/15 shadow-sm shadow-emerald-500/5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping absolute" />
                <span className="h-2 w-2 rounded-full bg-emerald-500 relative" />
                API Online
              </div>
            )}
            {apiStatus === "offline" && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/15 animate-pulse">
                <AlertCircle className="h-3.5 w-3.5" />
                API Offline
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Page Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10">
        {children}
      </main>
    </div>
  );
}
