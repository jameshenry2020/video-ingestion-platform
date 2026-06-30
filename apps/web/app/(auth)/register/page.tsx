"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Loader2, UserPlus } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const { login, checkAuth } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated, redirect to home
  useEffect(() => {
    checkAuth().then((auth) => {
      if (auth) {
        router.push("/");
      }
    });
  }, [router, checkAuth]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/auth/register", { email, password });
      const { accessToken, user } = res.data;
      login(accessToken, user);
      router.push("/");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Email might already be taken."
      );
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 glass-effect p-8 rounded-2xl shadow-xl">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary mb-4 animate-float">
            <UserPlus className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
            Create Account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign up to upload and process videos
          </p>
        </div>

        {error && (
          <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-sm text-destructive font-medium">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground shadow-sm placeholder-muted-foreground transition duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground shadow-sm placeholder-muted-foreground transition duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-border bg-input px-4 py-3 text-foreground shadow-sm placeholder-muted-foreground transition duration-200 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-6 text-sm font-semibold rounded-lg"
              variant="gradient"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline hover:text-primary-hover"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
