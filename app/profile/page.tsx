
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name ?? "");
    }
  }, [session?.user]);

  async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!name.trim()) {
      setError("আপনার নাম লিখুন।");
      return;
    }

    setSaving(true);

    try {
      const result = await authClient.updateUser({
        name: name.trim(),
      });

      if (result.error) {
        setError(result.error.message || "নাম আপডেট করা যায়নি।");
        return;
      }

      setMessage("আপনার নাম আপডেট হয়েছে।");
    } catch {
      setError("নাম আপডেট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    setError("");
    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        setError(result.error.message || "সাইন আউট করা যায়নি।");
        return;
      }

      router.replace("/");
      router.refresh();
    } catch {
      setError("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
    } finally {
      setSigningOut(false);
    }
  }

  if (isPending || !session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5ef]">
        <p className="text-sm text-[#687369]">প্রোফাইল লোড হচ্ছে...</p>
      </main>
    );
  }

  const user = session.user;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f0f5ef]">
        <section className="mx-auto min-h-[650px] max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-[520px]">
            <header className="mb-6">
              <h1 className="text-2xl font-extrabold text-[#253128]">
                আমার প্রোফাইল
              </h1>
              <p className="mt-2 text-sm text-[#7a837b]">
                আপনার অ্যাকাউন্টের তথ্য দেখুন।
              </p>
            </header>

            <section className="flex flex-col gap-4 rounded-2xl border border-[#e0e8df] bg-[#fbfdfb] p-4 sm:flex-row sm:items-center sm:p-5">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "Profile"}
                    className="h-14 w-14 shrink-0 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#078b46] text-2xl font-bold text-white">
                    {(user.name || user.email || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </div>
                )}

                <div className="min-w-0">
                  <h2 className="break-words font-bold text-[#253128]">
                    {user.name || "ব্যবহারকারী"}
                  </h2>
                  <p className="break-all text-sm text-[#727d74]">
                    {user.email}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="shrink-0 rounded-lg border border-red-400 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:opacity-60"
              >
                {signingOut ? "সাইন আউট হচ্ছে..." : "↪ সাইন আউট"}
              </button>
            </section>

            <section className="mt-4 rounded-2xl border border-[#e0e8df] bg-[#fbfdfb] p-5 sm:p-6">
              <h2 className="font-bold text-[#253128]">তথ্য</h2>

              <form onSubmit={handleUpdate} className="mt-6">
                <label
                  htmlFor="profile-name"
                  className="mb-2 block text-sm font-medium text-[#344137]"
                >
                  নাম
                </label>

                <input
                  id="profile-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="আপনার নাম লিখুন"
                  required
                  className="w-full rounded-lg border border-[#dfe7de] bg-transparent px-3 py-3 text-sm outline-none transition focus:border-[#078b46] focus:ring-2 focus:ring-[#078b46]/10"
                />

                {error && (
                  <p role="alert" className="mt-3 text-sm text-red-600">
                    {error}
                  </p>
                )}

                {message && (
                  <p role="status" className="mt-3 text-sm text-green-700">
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={saving}
                  className="mt-4 w-full rounded-lg bg-[#078b46] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#06763c] disabled:opacity-60"
                >
                  {saving ? "আপডেট হচ্ছে..." : "আপডেট"}
                </button>
              </form>
            </section>

            <Link
              href="/"
              className="mt-6 block text-center text-sm text-[#727d74] transition hover:text-[#078b46]"
            >
              ← হোম পেজে ফিরে যান
            </Link>
          </div>
        </section>

        <footer className="border-t border-[#e4ebe3] bg-[#fbfdfb] px-5 py-5">
          <div className="mx-auto flex max-w-6xl flex-col justify-between gap-3 text-center text-xs text-[#69736a] sm:flex-row sm:text-left">
            <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
            <p>সকল দাম বাজার পরিস্থিতি অনুযায়ী পরিবর্তিত হতে পারে।</p>
          </div>
        </footer>
      </main>
    </>
  );
}
