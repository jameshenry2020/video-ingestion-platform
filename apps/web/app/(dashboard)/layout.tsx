"use client";

import * as React from "react";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { Button } from "@/components/ui/button";
import { Film, LogOut, Upload, Grid, User, Loader2 } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, loading, checkAuth, logout } = useAuthStore();

  useEffect(() => {
    checkAuth().then((auth) => {
      if (!auth) {
        router.push("/login");
      }
    });
  }, [router, checkAuth]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <span className="text-sm font-semibold tracking-wider text-muted-foreground">
            Verifying session...
          </span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Avoid flashing dashboard content while redirecting
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md">
                <Film className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                AetherMedia
              </span>
            </Link>

            {/* Navigation links */}
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/">
                <Button
                  variant={pathname === "/" ? "secondary" : "ghost"}
                  className="gap-2 text-sm font-medium"
                >
                  <Grid className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/upload">
                <Button
                  variant={pathname === "/upload" ? "secondary" : "ghost"}
                  className="gap-2 text-sm font-medium"
                >
                  <Upload className="h-4 w-4" />
                  Upload Video
                </Button>
              </Link>
            </nav>
          </div>

          {/* User actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-secondary/50 max-w-[200px]">
              <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="text-xs font-medium text-muted-foreground truncate">
                {user?.email}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2 text-xs font-semibold hover:border-destructive hover:bg-destructive/10 hover:text-destructive transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Page Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
