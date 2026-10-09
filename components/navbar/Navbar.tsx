
"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API = "https://api.api-store.workers.dev/api/bazardor";
const FALLBACK_API = "https://api.abcz.workers.dev/api/bazardor";

const categories = [
  { id: "chal", slug: "chal", nameBn: "চাল", icon: "🍚" },
  { id: "dal", slug: "dal", nameBn: "ডাল", icon: "dal" },
  { id: "tel", slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { id: "sobji", slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { id: "mach", slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { id: "mangsho", slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { id: "dim-dui", slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { id: "mosla", slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

type Product = {
  id?: string | number;
  slug?: string;
  nameBn?: string;
  name_bn?: string;
  name?: string;
  title?: string;
  category?: string | { slug?: string; id?: string };
  categoryIcon?: string;
  image?: string;
  emoji?: string;
  icon?: string;
  today?: number | string;
  yesterday?: number | string;
  lastWeek?: number | string;
  lastMonth?: number | string;
  price?: number | string;
  currentPrice?: number | string;
  current_price?: number | string;
  todayPrice?: number | string;
  today_price?: number | string;
  unit?: string;
  unitBn?: string;
  unit_bn?: string;
  change?: {
    dir?: "up" | "down" | "flat";
    pct?: number | string;
  };
  changePercent?: number | string;
  change_percent?: number | string;
  priceChange?: number | string;
  price_change?: number | string;
};

function bn(value: number) {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 2,
  }).format(value);
}

function getDate() {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
}

function getProductList(data: unknown): Product[] {
  if (Array.isArray(data)) {
    return data as Product[];
  }

  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;

    if (Array.isArray(obj.products)) {
      return obj.products as Product[];
    }

    if (Array.isArray(obj.data)) {
      return obj.data as Product[];
    }
  }

  return [];
}

function getProductName(product: Product) {
  return (
    product.nameBn ??
    product.name_bn ??
    product.name ??
    product.title ??
    "পণ্য"
  );
}

function getProductPrice(product: Product): number | null {
  const raw =
    product.today ??
    product.currentPrice ??
    product.current_price ??
    product.todayPrice ??
    product.today_price ??
    product.price;

  if (raw === undefined || raw === null || raw === "") {
    return null;
  }

  const price = Number(raw);
  return Number.isFinite(price) ? price : null;
}

function getProductChange(product: Product): number | null {
  const raw =
    product.change?.pct ??
    product.changePercent ??
    product.change_percent ??
    product.priceChange ??
    product.price_change;

  if (raw === undefined || raw === null || raw === "") {
    return null;
  }

  const change = Number(raw);
  return Number.isFinite(change) ? change : null;
}

function getProductDirection(product: Product) {
  if (product.change?.dir) {
    return product.change.dir;
  }

  const change = getProductChange(product);

  if (change === null || change === 0) return "flat";
  return change > 0 ? "up" : "down";
}

function getProductUnit(product: Product) {
  const raw = product.unitBn ?? product.unit_bn ?? product.unit ?? "";

  const unitLabels: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  return unitLabels[raw.toLowerCase()] ?? raw;
}

/* Lentil icon */
function DalIcon() {
  return (
    <svg
      viewBox="0 0 44 36"
      width="28"
      height="25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g transform="rotate(-28 13 11)">
        <ellipse cx="13" cy="11" rx="10" ry="6.5" fill="#8B352A" />
        <ellipse cx="13" cy="10" rx="8" ry="4.5" fill="#A94B3D" />
        <path
          d="M7 10 Q13 6 19 10"
          stroke="#D18A73"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <g transform="rotate(24 29 12)">
        <ellipse cx="29" cy="12" rx="10" ry="6.5" fill="#74291F" />
        <ellipse cx="29" cy="11" rx="8" ry="4.5" fill="#9E4032" />
        <path
          d="M23 11 Q29 7 35 11"
          stroke="#D18A73"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
      <g transform="rotate(-15 20 25)">
        <ellipse cx="20" cy="25" rx="10" ry="6.5" fill="#8C3025" />
        <ellipse cx="20" cy="24" rx="8" ry="4.5" fill="#B54F3E" />
        <path
          d="M14 24 Q20 20 26 24"
          stroke="#E1A08A"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

/* Leafy vegetable icon */
function VegetableIcon() {
  return (
    <svg
      viewBox="0 0 36 36"
      width="28"
      height="28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M17 32 C15 24 9 17 5 11 C14 10 21 16 20 25"
        fill="#5AAB48"
      />
      <path
        d="M18 31 C19 20 23 9 32 5 C34 17 29 27 18 31"
        fill="#168B45"
      />
      <path
        d="M17 31 C7 28 2 21 3 14 C13 15 18 21 17 31"
        fill="#83C968"
      />
      <path
        d="M18 32 C18 23 21 14 30 7"
        stroke="#126A36"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M17 31 L8 17"
        stroke="#3C923E"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M18 32 L18 34"
        stroke="#3F8E45"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CategoryIcon({
  slug,
  icon,
}: {
  slug: string;
  icon: string;
}) {
  if (slug === "dal") return <DalIcon />;
  if (slug === "sobji") return <VegetableIcon />;

  return (
    <span className="shrink-0 text-lg" aria-hidden="true">
      {icon}
    </span>
  );
}

function ProductIcon({ product }: { product: Product }) {
  const slug =
    typeof product.category === "string"
      ? product.category
      : product.category?.slug ?? product.category?.id;

  if (slug === "dal") return <DalIcon />;
  if (slug === "sobji") return <VegetableIcon />;

  const icon =
    product.image ??
    product.categoryIcon ??
    product.emoji ??
    product.icon ??
    categories.find((category) => category.slug === slug)?.icon ??
    "🛒";

  return (
    <span className="shrink-0 text-base" aria-hidden="true">
      {icon}
    </span>
  );
}

export default function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const pathname = usePathname();

  const [date, setDate] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingPrices, setLoadingPrices] = useState(true);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    setDate(getDate());

    let cancelled = false;

    async function loadProducts() {
      try {
        let response = await fetch(`${API}/products`);

        if (!response.ok) {
          response = await fetch(`${FALLBACK_API}/products`);
        }

        if (!response.ok) {
          throw new Error(`Product API failed: ${response.status}`);
        }

        const data: unknown = await response.json();

        if (!cancelled) {
          setProducts(getProductList(data));
        }
      } catch (error) {
        console.error("BazarDor API error:", error);

        if (!cancelled) {
          setProducts([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingPrices(false);
        }
      }
    }

    void loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSignOut() {
    if (signingOut) return;

    setSigningOut(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error("সাইন আউট করা যায়নি");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করা যায়নি");
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e1e9e0] bg-[#fbfdfb] text-[#202a22] shadow-sm">
      {/* Logo and authentication */}
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          aria-label="বাজার দর হোম"
          className="flex min-w-0 items-center gap-3"
        >
          <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#078a45]">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর cart"
              width={48}
              height={48}
              priority
              className="h-12 w-12 object-contain"
            />
          </span>

          <span className="min-w-0">
            <span className="block text-xl font-extrabold leading-tight sm:text-2xl">
              বাজার দর
            </span>
            <span className="mt-1 block truncate text-[10px] text-gray-600 sm:text-xs">
              {date || "বাংলাদেশের বাজার"}
            </span>
          </span>
        </Link>

        <div className="flex shrink-0 items-center gap-2">
          {isPending ? (
            <div className="h-9 w-20 animate-pulse rounded-lg bg-gray-100" />
          ) : session?.user ? (
            <>
              <Link
                href="/profile"
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-gray-100"
              >
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={34}
                    height={34}
                    className="h-[34px] w-[34px] rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-green-100 font-bold text-green-800">
                    {(session.user.name || "U").charAt(0)}
                  </span>
                )}

                <span className="hidden max-w-24 truncate text-sm font-medium sm:block">
                  {session.user.name || "প্রোফাইল"}
                </span>
              </Link>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-semibold hover:bg-gray-50 disabled:opacity-50 sm:text-sm"
              >
                {signingOut ? "অপেক্ষা করুন..." : "সাইন আউট"}
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signin"
                className="rounded-lg bg-[#078a45] px-3 py-2 text-xs font-semibold text-white hover:bg-green-800 sm:px-4 sm:text-sm"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="rounded-lg border border-[#078a45] px-3 py-2 text-xs font-semibold text-[#08783e] hover:bg-green-50 sm:px-4 sm:text-sm"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Category navigation */}
      <div className="border-t border-[#edf1ed]">
        <nav
          aria-label="পণ্যের ক্যাটাগরি"
          className="mx-auto flex max-w-6xl items-center gap-1 overflow-x-auto px-3 py-2 sm:justify-center sm:gap-4 sm:px-6"
        >
          {categories.map((category) => {
            const active = pathname === `/category/${category.slug}`;

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                aria-current={active ? "page" : undefined}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-[#e1f3e6] text-[#08783e]"
                    : "text-[#303a32] hover:bg-[#eef5ef]"
                }`}
              >
                <CategoryIcon
                  slug={category.slug}
                  icon={category.icon}
                />
                <span>{category.nameBn}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Figma-style API price ticker */}
      <div className="overflow-hidden border-y border-dotted border-blue-400 bg-white">
        {loadingPrices ? (
          <div className="px-4 py-2.5 text-xs text-gray-500">
            বাজারের দামের তথ্য লোড হচ্ছে...
          </div>
        ) : products.length === 0 ? (
          <div className="px-4 py-2.5 text-xs text-gray-500">
            এই মুহূর্তে বাজারের দামের তথ্য পাওয়া যাচ্ছে না।
          </div>
        ) : (
          <div className="ticker-track flex w-max items-center">
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className="flex shrink-0 items-center"
              >
                {products.map((product, index) => {
                  const price = getProductPrice(product);
                  const change = getProductChange(product);
                  const direction = getProductDirection(product);
                  const name = getProductName(product);
                  const unit = getProductUnit(product);

                  return (
                    <div
                      key={`${copy}-${product.id ?? product.slug ?? index}`}
                      className="flex shrink-0 items-center gap-2 whitespace-nowrap border-r border-[#e0e8de] px-4 py-2.5 text-xs sm:text-sm"
                    >
                      <ProductIcon product={product} />

                      <span className="font-semibold text-[#303a32]">
                        {name}
                      </span>

                      <span className="text-gray-600">
                        {price === null
                          ? "দাম পাওয়া যায়নি"
                          : `${bn(price)} টাকা${unit ? `/${unit}` : ""}`}
                      </span>

                      {change !== null && (
                        <span
                          className={`font-bold ${
                            direction === "up"
                              ? "text-red-600"
                              : direction === "down"
                                ? "text-green-700"
                                : "text-gray-500"
                          }`}
                        >
                          {direction === "up"
                            ? "▲"
                            : direction === "down"
                              ? "▼"
                              : "—"}{" "}
                          {bn(Math.abs(change))}%
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .ticker-track {
          animation: ticker-scroll 38s linear infinite;
        }

        .ticker-track:hover {
          animation-play-state: paused;
        }

        @keyframes ticker-scroll {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ticker-track {
            animation: none;
          }
        }
      `}</style>
    </header>
  );
}
