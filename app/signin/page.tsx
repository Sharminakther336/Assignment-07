
"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar/Navbar";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  async function handleEmailSignIn(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (result.error) {
        setError(
          result.error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।"
        );
        return;
      }

      window.location.href = "/";
    } catch {
      setError("সাইন ইন করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  async function handleSocialSignIn(
    provider: "google" | "github"
  ) {
    setError("");
    setSocialLoading(provider);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result.error) {
        setError(
          result.error.message || "সামাজিক লগইন করা যায়নি।"
        );
        setSocialLoading("");
      }
    } catch {
      setError("লগইন করা যায়নি। আবার চেষ্টা করুন।");
      setSocialLoading("");
    }
  }

  const busy = loading || Boolean(socialLoading);

  return (
    <div className="flex min-h-screen flex-col bg-[#f0f5ef] text-[#26352b]">
      <Navbar />

      <main className="flex flex-1 flex-col items-center px-4 pb-8 pt-7 sm:pt-8">
        <header className="mb-5 text-center">
          <h1 className="text-xl font-bold leading-7 text-[#202a22]">
            সাইন ইন
          </h1>
          <p className="mt-1 text-xs leading-5 text-[#68736b]">
            আপনার BazarDor অ্যাকাউন্টে প্রবেশ করুন।
          </p>
        </header>

        <section className="w-full max-w-[416px] rounded-xl border border-[#e2e9e1] bg-[#fbfcfa] p-4 shadow-sm sm:p-5">
          {error && (
            <p
              role="alert"
              aria-live="polite"
              className="mb-3 rounded-md bg-red-50 p-3 text-sm leading-5 text-red-700"
            >
              {error}
            </p>
          )}

          <form onSubmit={handleEmailSignIn} className="space-y-3">
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-xs font-medium"
              >
                ইমেইল *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                disabled={busy}
                className="h-11 w-full rounded-lg border border-[#dfe7df] bg-white px-3 text-sm outline-none focus:border-[#078a45] focus:ring-2 focus:ring-[#078a45]/10 disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-xs font-medium"
              >
                পাসওয়ার্ড *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                disabled={busy}
                className="h-11 w-full rounded-lg border border-[#dfe7df] bg-white px-3 text-sm outline-none focus:border-[#078a45] focus:ring-2 focus:ring-[#078a45]/10 disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="h-12 w-full rounded-lg bg-[#078a45] text-sm font-semibold text-white shadow-sm transition hover:bg-[#06763b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন করুন"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#dfe7df]" />
            <span className="text-xs text-[#68736b]">অথবা</span>
            <div className="h-px flex-1 bg-[#dfe7df]" />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => handleSocialSignIn("google")}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#dfe7df] bg-white px-3 text-xs font-medium transition hover:bg-[#f2f6f1] disabled:opacity-60"
            >
              <span className="font-bold text-base text-[#4285f4]">G</span>
              {socialLoading === "google"
                ? "সংযোগ হচ্ছে..."
                : "Google দিয়ে চালিয়ে যান"}
            </button>

            <button
              type="button"
              disabled={busy}
              onClick={() => handleSocialSignIn("github")}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg border border-[#dfe7df] bg-white px-3 text-xs font-medium transition hover:bg-[#f2f6f1] disabled:opacity-60"
            >
              <span className="font-bold text-base text-[#24292f]">●</span>
              {socialLoading === "github"
                ? "সংযোগ হচ্ছে..."
                : "GitHub দিয়ে চালিয়ে যান"}
            </button>
          </div>

          <p className="mt-5 text-center text-xs text-[#68736b]">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="font-semibold text-[#078a45] underline underline-offset-2 hover:text-[#06763b]"
            >
              অ্যাকাউন্ট তৈরি করুন
            </Link>
          </p>
        </section>

        <Link
          href="/"
          className="mt-6 text-xs text-[#68736b] transition hover:text-[#078a45]"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </main>

      <footer className="flex min-h-[72px] flex-col items-center justify-center gap-2 border-t border-[#e2e9e1] bg-[#fbfcfa] px-4 py-4 text-center text-[10px] text-[#68736b] sm:flex-row sm:justify-between sm:px-8 lg:px-16">
        <p>বাজার দর — বাংলাদেশের নিত্যপণ্যের দাম এক নজরে।</p>
        <p>সঠিক দাম জানুন, সঠিক সিদ্ধান্ত নিন।</p>
      </footer>
    </div>
  );
}
