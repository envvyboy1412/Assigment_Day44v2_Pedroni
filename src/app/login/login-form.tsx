"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/env";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showNote, setShowNote] = useState(false);

  if (!isSupabaseConfigured()) {
    return (
      <div className="mt-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-950">
        <p>
          Supabase is not configured. Add <code className="rounded bg-amber-200/80 px-1">.env.local</code>{" "}
          with your project URL and anon key, then restart the dev server.
        </p>
        <p className="mt-2">
          Without Supabase, the public site still works with demo data; admin CRUD requires a
          database.
        </p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const supabase = createClient();
    if (!supabase) {
      setError("Supabase client unavailable.");
      setLoading(false);
      return;
    }
    const { error: signError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (signError) {
      setError(signError.message);
      setLoading(false);
      return;
    }
    router.push(next);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800" role="alert">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-stone-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 shadow-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-stone-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-stone-900 shadow-sm focus:border-amber-600 focus:outline-none focus:ring-1 focus:ring-amber-600"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-stone-900 py-3 text-sm font-semibold text-white transition hover:bg-stone-800 disabled:opacity-60"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>

      <button
        type="button"
        onClick={() => setShowNote((prev) => !prev)}
        className="w-full rounded-full border border-stone-300 bg-white py-2 text-sm font-medium text-stone-900 transition hover:bg-stone-100"
      >
        {showNote ? "Hide Account" : "Show Account"}
      </button>

      {showNote && (
        <div className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-950">
          <p><strong>Email:</strong> admin@gmail.com</p>
          <p><strong>Password:</strong> admin123</p>
        </div>
      )}

      <div className="mt-4 text-center">
        <Link
          href="/"
          className="text-sm font-medium text-stone-900 underline hover:text-amber-600"
        >
          ← Back to Home
        </Link>
      </div>
    </form>
  );
}