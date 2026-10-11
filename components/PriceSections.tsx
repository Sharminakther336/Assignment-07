
"use client";

import { useEffect, useState } from "react";

const API_URL = "https://api.api-store.workers.dev/api/bazardor/products";
const FALLBACK_API_URL = "https://api.abcz.workers.dev/api/bazardor/products";

type ApiProduct = {
  id?: string | number;
  slug?: string;
  nameBn?: string;
  name?: string;
  title?: string;
  product_name?: string;
  today?: number | string;
  yesterday?: number | string;
  todayPrice?: number | string;
  yesterdayPrice?: number | string;
  today_price?: number | string;
  yesterday_price?: number | string;
  current_price?: number | string;
  previous_price?: number | string;
  price_today?: number | string;
  price_yesterday?: number | string;
  price?: number | string;
  unit?: string;
  image?: string;
  image_url?: string;
  categoryIcon?: string;
};

type Product = {
  id: string;
  name: string;
  today: number | null;
  yesterday: number | null;
  unit: string;
  image: string;
};

const increasedOrder = [
  ["পেঁয়াজ", "পেঁয়াজ", "onion", "peyaj"],
  ["আদা", "ginger"],
  ["বেগুন", "eggplant", "begun"],
  ["রুই মাছ", "রুই", "rui", "rohu"],
  ["ডিম", "egg"],
  ["মাখন", "butter"],
];

const decreasedOrder = [
  ["কাঁচামরিচ", "কাঁচা মরিচ", "মরিচ", "chili", "chilli"],
  ["রসুন", "garlic"],
  ["আলু", "potato"],
  ["কাতলা", "katla", "catla"],
  ["হাঁসের মাংস", "হাঁস", "duck"],
  ["খাসির মাংস", "খাসি", "mutton", "goat"],
];

function normalize(value: string) {
  return value.toLowerCase().replace(/\s+/g, "");
}

function parsePrice(value: unknown): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) && value >= 0 ? value : null;
  }

  if (typeof value !== "string" || !value.trim()) return null;

  const normalized = value
    .replace(/[০-৯]/g, (digit) =>
      String("০১২৩৪৫৬৭৮৯".indexOf(digit))
    )
    .replace(/,/g, "")
    .replace(/[^\d.]/g, "");

  if (!normalized) return null;

  const result = Number(normalized);
  return Number.isFinite(result) && result >= 0 ? result : null;
}

function getPrice(
  product: ApiProduct,
  keys: (keyof ApiProduct)[]
): number | null {
  for (const key of keys) {
    const price = parsePrice(product[key]);
    if (price !== null) return price;
  }

  return null;
}

function getName(product: ApiProduct) {
  return String(
    product.nameBn ??
      product.name ??
      product.product_name ??
      product.title ??
      "পণ্য"
  );
}

function getUnit(unit?: string) {
  const units: Record<string, string> = {
    kg: "কেজি",
    kilogram: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    l: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
    gram: "গ্রাম",
    g: "গ্রাম",
  };

  return units[(unit ?? "").toLowerCase()] ?? unit ?? "কেজি";
}

function getIcon(product: Product) {
  const name = normalize(`${product.name} ${product.id}`);

  const icons: [string[], string][] = [
    [["পেঁয়াজ", "পেঁয়াজ", "onion", "peyaj"], "🧅"],
    [["আদা", "ginger"], "🫚"],
    [["বেগুন", "eggplant", "begun"], "🍆"],
    [["রুইমাছ", "rui", "rohu"], "🐟"],
    [["কইমাছ", "koi"], "🐟"],
    [["কাতলা", "katla", "catla"], "🐠"],
    [["ইলিশ", "hilsa", "ilish"], "🐟"],
    [["চিংড়ি", "চিংড়ি", "shrimp", "prawn"], "🦐"],
    [["মাছ", "fish", "mach"], "🐟"],
    [["ডিম", "egg"], "🥚"],
    [["মাখন", "butter"], "🧈"],
    [["কাঁচামরিচ", "কাঁচামরিচ", "মরিচ", "chili", "chilli"], "🌶️"],
    [["রসুন", "garlic"], "🧄"],
    [["আলু", "potato"], "🥔"],
    [["হাঁস", "duck"], "🦆"],
    [["খাসি", "mutton", "goat"], "🍖"],
    [["গরু", "beef"], "🥩"],
    [["মুরগি", "chicken"], "🍗"],
    [["চাল", "rice"], "🍚"],
    [["ডাল", "lentil"], "🫘"],
    [["তেল", "oil"], "🫙"],
    [["দুধ", "milk"], "🥛"],
    [["টমেটো", "tomato"], "🍅"],
    [["কলা", "banana"], "🍌"],
    [["আম", "mango"], "🥭"],
    [["শসা", "cucumber"], "🥒"],
    [["গাজর", "carrot"], "🥕"],
    [["বাঁধাকপি", "cabbage"], "🥬"],
    [["ফুলকপি", "cauliflower"], "🥦"],
  ];

  return (
    icons.find(([words]) =>
      words.some((word) => name.includes(normalize(word)))
    )?.[1] ?? "🛒"
  );
}

function matchesProduct(product: Product, aliases: string[]) {
  const name = normalize(`${product.name} ${product.id}`);
  return aliases.some((alias) => name.includes(normalize(alias)));
}

function formatPrice(price: number | null) {
  if (price === null) return "তথ্য নেই";

  return `${price.toLocaleString("bn-BD", {
    maximumFractionDigits: 2,
  })} টাকা`;
}

function formatNumber(value: number) {
  return value.toLocaleString("bn-BD", {
    maximumFractionDigits: 1,
  });
}

function GingerIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-8 w-8"
      role="img"
      aria-label="আদা"
    >
      <path
        d="M27 12 C20 8 17 14 19 20 L23 26 L15 30 C10 33 12 40 17 42 L22 43 L18 50 C16 55 21 59 26 56 L35 49 L41 53 C47 57 53 51 49 46 L45 40 L51 34 C56 28 50 23 44 26 L38 29 L37 19 C37 12 30 9 27 12Z"
        fill="#D6A15B"
        stroke="#A86D32"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M25 17 L29 23 M19 35 L28 35 M26 49 L32 43 M39 34 L44 32 M37 45 L42 47"
        fill="none"
        stroke="#F4D4A0"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M27 12 C24 7 27 4 31 4"
        fill="none"
        stroke="#6B9850"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { today, yesterday } = product;
  const valid = today !== null && yesterday !== null;
  const isGinger = /আদা|ginger/i.test(`${product.name} ${product.id}`);

  const direction =
    !valid || today === yesterday
      ? "same"
      : today > yesterday
        ? "up"
        : "down";

  const percentage =
    valid && yesterday > 0
      ? (Math.abs(today - yesterday) / yesterday) * 100
      : 0;

  const image = product.image.trim();
  const imageUrl =
    /^https?:\/\//i.test(image) || image.startsWith("/");

  const hasEmoji =
    image.length > 0 &&
    image.length <= 8 &&
    !/[a-z]/i.test(image) &&
    !imageUrl;

  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="relative flex min-h-[98px] min-w-0 items-start gap-2.5 rounded-[13px] border border-[#e1e9e0] bg-[#fbfdfb] p-3 transition-shadow hover:shadow-md">
      <div className="flex h-[36px] w-[36px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-[#f0f5ef]">
        {isGinger ? (
          <GingerIcon />
        ) : imageUrl && !imageFailed ? (
          <img
            src={image}
            alt={product.name}
            className="h-8 w-8 object-contain"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="text-[23px]">
            {hasEmoji && !imageFailed ? image : getIcon(product)}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[12px] font-bold leading-[18px] text-[#253128]">
          {product.name}
        </h3>

        <p className="text-[10px] leading-[15px] text-[#727d74]">
          প্রতি {product.unit}
        </p>

        <p className="mt-[10px] text-[10px] leading-3 text-[#626b63]">
          আজকের দাম
        </p>

        <p className="text-[13px] font-extrabold leading-5 text-[#202a22]">
          {formatPrice(today)}
        </p>
      </div>

      <span
        className={`absolute bottom-3 right-3 rounded-full px-2 py-1 text-[9px] font-bold ${
          direction === "up"
            ? "bg-[#f0f5ef] text-red-600"
            : direction === "down"
              ? "bg-[#edf7ef] text-green-600"
              : "bg-[#f0f4f0] text-gray-600"
        }`}
      >
        {direction === "up"
          ? `▲ ${formatNumber(percentage)}%`
          : direction === "down"
            ? `▼ ${formatNumber(percentage)}%`
            : valid
              ? "— ০.০%"
              : "—"}
      </span>
    </article>
  );
}

function PriceSection({
  title,
  products,
  direction,
  subtitle,
}: {
  title: string;
  products: Product[];
  direction?: "up" | "down";
  subtitle?: string;
}) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        {direction && (
          <span
            className={`text-[13px] font-bold ${
              direction === "up" ? "text-red-600" : "text-green-600"
            }`}
          >
            {direction === "up" ? "▲" : "▼"}
          </span>
        )}

        <h2 className="text-[15px] font-extrabold text-[#253128]">
          {title}
        </h2>
      </div>

      {subtitle && (
        <p className="mb-3 text-[11px] text-[#727d74]">{subtitle}</p>
      )}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default function PriceSections() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        let response: Response;

        try {
          response = await fetch(API_URL, {
            signal: controller.signal,
            cache: "no-store",
          });

          if (!response.ok) throw new Error("Primary API failed");
        } catch {
          if (controller.signal.aborted) return;

          response = await fetch(FALLBACK_API_URL, {
            signal: controller.signal,
            cache: "no-store",
          });

          if (!response.ok) throw new Error("Fallback API failed");
        }

        const json: unknown = await response.json();
        let data: unknown = json;

        if (typeof data === "object" && data !== null && "data" in data) {
          data = (data as { data: unknown }).data;
        }

        if (
          typeof data === "object" &&
          data !== null &&
          "products" in data
        ) {
          data = (data as { products: unknown }).products;
        }

        if (!Array.isArray(data)) {
          throw new Error("Invalid API response");
        }

        const mapped: Product[] = (data as ApiProduct[]).map(
          (item, index) => ({
            id: String(item.id ?? item.slug ?? index),
            name: getName(item),
            today: getPrice(item, [
              "today",
              "todayPrice",
              "today_price",
              "current_price",
              "price_today",
              "price",
            ]),
            yesterday: getPrice(item, [
              "yesterday",
              "yesterdayPrice",
              "yesterday_price",
              "previous_price",
              "price_yesterday",
            ]),
            unit: getUnit(item.unit),
            image: String(
              item.image_url ?? item.image ?? item.categoryIcon ?? ""
            ),
          })
        );

        if (!controller.signal.aborted) {
          setProducts(mapped);
          setError(false);
        }
      } catch {
        if (!controller.signal.aborted) {
          setProducts([]);
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void fetchProducts();

    return () => controller.abort();
  }, []);

  const increased = increasedOrder
    .map((aliases) =>
      products.find(
        (product) =>
          matchesProduct(product, aliases) &&
          product.today !== null &&
          product.yesterday !== null &&
          product.today > product.yesterday
      )
    )
    .filter((product): product is Product => product !== undefined);

  const decreased = decreasedOrder
    .map((aliases) =>
      products.find(
        (product) =>
          matchesProduct(product, aliases) &&
          product.today !== null &&
          product.yesterday !== null &&
          product.today < product.yesterday
      )
    )
    .filter((product): product is Product => product !== undefined);

  return (
    <div className="mx-auto w-full max-w-[836px] space-y-7 bg-[#f0f5ef] px-4 pb-10 pt-6 sm:px-0">
      {loading && (
        <p className="text-xs text-gray-500">
          বাজারদরের তথ্য লোড হচ্ছে...
        </p>
      )}

      {error && (
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          বাজারদরের তথ্য পাওয়া যায়নি। API সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
        </p>
      )}

      {!loading && !error && (
        <>
          <PriceSection
            title="আজ দাম বেড়েছে"
            products={increased}
            direction="up"
          />

          <PriceSection
            title="আজ দাম কমেছে"
            products={decreased}
            direction="down"
          />

          <PriceSection
            title="সব পণ্য"
            subtitle={`মোট ${formatNumber(products.length)}টি পণ্য দেখানো হচ্ছে`}
            products={products}
          />
        </>
      )}
    </div>
  );
}
