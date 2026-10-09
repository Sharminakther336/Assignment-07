
"use client";

import { useEffect, useState } from "react";

const API_URL =
  "https://api.api-store.workers.dev/api/bazardor/products";

const FALLBACK_API_URL =
  "https://api.abcz.workers.dev/api/bazardor/products";

type ApiProduct = {
  id?: number | string;
  slug?: string;
  nameBn?: string;
  name?: string;
  title?: string;
  product_name?: string;
  category?: string;
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
  change?: {
    dir?: string;
    pct?: number | string;
  };
};

type ProductConfig = {
  key: string;
  name: string;
  aliases: string[];
  icon: string;
  unit: string;
};

type PriceProduct = ProductConfig & {
  today: number | null;
  yesterday: number | null;
  image?: string;
};

const INCREASED_PRODUCTS: ProductConfig[] = [
  {
    key: "onion",
    name: "পেঁয়াজ",
    aliases: ["পেঁয়াজ", "পেঁয়াজ", "পেয়াজ", "onion"],
    icon: "🧅",
    unit: "কেজি",
  },
  {
    key: "ginger",
    name: "আদা",
    aliases: ["আদা", "ginger"],
    icon: "🫚",
    unit: "কেজি",
  },
  {
    key: "eggplant",
    name: "বেগুন",
    aliases: ["বেগুন", "begun", "eggplant", "brinjal"],
    icon: "🍆",
    unit: "কেজি",
  },
  {
    key: "koi-fish",
    name: "কই মাছ",
    aliases: ["কই মাছ", "কৈ মাছ", "কই", "koi fish", "koi mach"],
    icon: "🐟",
    unit: "কেজি",
  },
  {
    key: "egg",
    name: "ডিম",
    aliases: ["ডিম", "egg", "eggs"],
    icon: "🥚",
    unit: "ডজন",
  },
  {
    key: "butter",
    name: "মাখন (৫০০ গ্রাম)",
    aliases: ["মাখন (৫০০ গ্রাম)", "মাখন", "butter"],
    icon: "🧈",
    unit: "৫০০ গ্রাম",
  },
];

const DECREASED_PRODUCTS: ProductConfig[] = [
  {
    key: "chili",
    name: "কাঁচামরিচ",
    aliases: ["কাঁচামরিচ", "কাঁচা মরিচ", "green chili", "green chilli"],
    icon: "🌶️",
    unit: "কেজি",
  },
  {
    key: "garlic",
    name: "রসুন",
    aliases: ["রসুন", "garlic"],
    icon: "🧄",
    unit: "কেজি",
  },
  {
    key: "potato",
    name: "আলু",
    aliases: ["আলু", "potato", "potatoes"],
    icon: "🥔",
    unit: "কেজি",
  },
  {
    key: "katla",
    name: "কাতলা মাছ",
    aliases: ["কাতলা মাছ", "কাতলা", "katla fish", "catla fish"],
    icon: "🐠",
    unit: "কেজি",
  },
  {
    key: "duck",
    name: "হাঁসের মাংস",
    aliases: ["হাঁসের মাংস", "হাঁস", "duck meat"],
    icon: "🦆",
    unit: "কেজি",
  },
  {
    key: "mutton",
    name: "খাসির মাংস",
    aliases: ["খাসির মাংস", "খাসি", "mutton", "goat meat"],
    icon: "🍖",
    unit: "কেজি",
  },
];

function normalizeName(value: unknown): string {
  return String(value ?? "")
    .normalize("NFC")
    .toLocaleLowerCase()
    .replace(/[০-৯]/g, (digit) =>
      String("০১২৩৪৫৬৭৮৯".indexOf(digit))
    )
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[()[\]（）]/g, " ")
    .replace(/[.,\-_/]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parsePrice(value: unknown): number | null {
  if (typeof value === "number") {
    return Number.isFinite(value) && value >= 0 ? value : null;
  }

  if (typeof value !== "string" || !value.trim()) {
    return null;
  }

  const normalized = value
    .replace(/[০-৯]/g, (digit) =>
      String("০১২৩৪৫৬৭৮৯".indexOf(digit))
    )
    .replace(/,/g, "")
    .replace(/[^\d.]/g, "");

  if (!normalized) return null;

  const price = Number(normalized);

  return Number.isFinite(price) && price >= 0 ? price : null;
}

function getProductName(product: ApiProduct): string {
  return String(
    product.nameBn ??
      product.name ??
      product.product_name ??
      product.title ??
      ""
  );
}

function findPrice(
  product: ApiProduct,
  keys: (keyof ApiProduct)[]
): number | null {
  for (const key of keys) {
    const price = parsePrice(product[key]);

    if (price !== null) return price;
  }

  return null;
}

function getPriceProduct(
  config: ProductConfig,
  products: ApiProduct[]
): PriceProduct {
  const aliases = [config.name, ...config.aliases].map(normalizeName);

  const match = products.find((product) => {
    const name = normalizeName(getProductName(product));
    const slug = normalizeName(product.slug);

    return aliases.includes(name) || aliases.includes(slug);
  });

  if (!match) {
    return {
      ...config,
      today: null,
      yesterday: null,
    };
  }

  const image = match.image_url ?? match.image;

  return {
    ...config,
    today: findPrice(match, [
      "today",
      "todayPrice",
      "today_price",
      "current_price",
      "price_today",
      "price",
    ]),
    yesterday: findPrice(match, [
      "yesterday",
      "yesterdayPrice",
      "yesterday_price",
      "previous_price",
      "price_yesterday",
    ]),
    image:
      typeof image === "string" && image.trim()
        ? image
        : undefined,
    unit:
      typeof match.unit === "string" && match.unit.trim()
        ? match.unit
        : config.unit,
  };
}

function GingerIcon() {
  return (
    <svg
      viewBox="0 0 64 64"
      width="44"
      height="44"
      role="img"
      aria-label="আদা"
      xmlns="http://www.w3.org/2000/svg"
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

function ProductIcon({ product }: { product: PriceProduct }) {
  const [imageFailed, setImageFailed] = useState(false);

  const fallbackIcons: Record<string, string> = {
    onion: "🧅",
    ginger: "🫚",
    eggplant: "🍆",
    "koi-fish": "🐟",
    egg: "🥚",
    butter: "🧈",
    chili: "🌶️",
    garlic: "🧄",
    potato: "🥔",
    katla: "🐠",
    duck: "🦆",
    mutton: "🍖",
  };

  if (product.key === "ginger") {
    return <GingerIcon />;
  }

  if (product.image && !imageFailed) {
    return (
      <img
        src={product.image}
        alt={product.name}
        className="h-10 w-10 object-contain"
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <span
      className="flex h-11 w-11 items-center justify-center text-3xl"
      role="img"
      aria-label={product.name}
    >
      {fallbackIcons[product.key] ?? "🛒"}
    </span>
  );
}

function formatPrice(price: number | null): string {
  if (price === null) return "তথ্য পাওয়া যায়নি";

  return (
    "৳" +
    price.toLocaleString("en-BD", {
      maximumFractionDigits: 2,
    })
  );
}

function formatBn(value: number): string {
  return value.toLocaleString("bn-BD", {
    maximumFractionDigits: 1,
  });
}

function getUnitLabel(unit: string): string {
  const labels: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  return labels[unit.toLowerCase()] ?? unit;
}

function PriceCard({
  product,
  direction,
}: {
  product: PriceProduct;
  direction: "up" | "down";
}) {
  const today = product.today;
  const yesterday = product.yesterday;
  const hasBothPrices = today !== null && yesterday !== null;

  const difference =
    hasBothPrices ? Math.abs(today - yesterday) : null;

  const percentage =
    hasBothPrices && yesterday > 0
      ? (Math.abs(today - yesterday) / yesterday) * 100
      : null;

  const actualDirection =
    hasBothPrices && today !== yesterday
      ? today > yesterday
        ? "up"
        : "down"
      : null;

  const isCorrectDirection = actualDirection === direction;

  return (
    <article className="flex min-h-[119px] min-w-0 items-center gap-3 rounded-xl border border-[#e1e9e0] bg-[#fbfdfb] p-3 transition-shadow hover:shadow-md sm:gap-4 sm:p-4">
      <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f0f5ef]">
        <ProductIcon product={product} />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-gray-800 sm:text-base">
          {product.name}
        </h3>

        <p className="mt-1 text-xs text-gray-500">
          প্রতি {getUnitLabel(product.unit)}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="text-base font-bold text-gray-900">
            {formatPrice(today)}
          </span>

          {yesterday !== null && (
            <span className="text-xs text-gray-400 line-through">
              {formatPrice(yesterday)}
            </span>
          )}
        </div>

        {hasBothPrices && actualDirection === null ? (
          <p className="mt-2 text-xs text-gray-500">
            দামের পরিবর্তন হয়নি
          </p>
        ) : hasBothPrices && isCorrectDirection ? (
          <div
            className={
              "mt-2 flex flex-wrap items-center gap-1 text-xs font-medium " +
              (direction === "up"
                ? "text-red-600"
                : "text-green-600")
            }
          >
            <span>
              {direction === "up" ? "↑" : "↓"}{" "}
              {formatPrice(difference)}
            </span>

            {percentage !== null && (
              <span>({formatBn(percentage)}%)</span>
            )}

            <span className="text-gray-400">
              গতকালের তুলনায়
            </span>
          </div>
        ) : (
          <p className="mt-2 text-xs text-gray-400">
            {today === null || yesterday === null
              ? "দামের তথ্য পাওয়া যায়নি"
              : "দাম অন্য দিকে পরিবর্তিত হয়েছে"}
          </p>
        )}
      </div>
    </article>
  );
}

function PriceSection({
  title,
  subtitle,
  products,
  direction,
}: {
  title: string;
  subtitle: string;
  products: PriceProduct[];
  direction: "up" | "down";
}) {
  const isUp = direction === "up";

  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <span
          className={
            "text-base font-bold " +
            (isUp ? "text-red-600" : "text-green-600")
          }
          aria-hidden="true"
        >
          {isUp ? "▲" : "▼"}
        </span>

        <h2 className="text-lg font-extrabold text-[#253128] sm:text-xl">
          {title}
        </h2>
      </div>

      <p className="mb-4 text-xs text-gray-500">{subtitle}</p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <PriceCard
            key={product.key}
            product={product}
            direction={direction}
          />
        ))}
      </div>
    </section>
  );
}

export default function PriceSections() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      setLoading(true);
      setError(false);

      try {
        let response: Response;

        try {
          response = await fetch(API_URL, {
            signal: controller.signal,
            cache: "no-store",
          });

          if (!response.ok) {
            throw new Error("Primary API request failed");
          }
        } catch {
          if (controller.signal.aborted) return;

          response = await fetch(FALLBACK_API_URL, {
            signal: controller.signal,
            cache: "no-store",
          });

          if (!response.ok) {
            throw new Error("Fallback API request failed");
          }
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
          throw new Error("Invalid products API response");
        }

        if (controller.signal.aborted) return;

        setProducts(data as ApiProduct[]);
      } catch (err) {
        if (controller.signal.aborted) return;

        console.error("PriceSections API error:", err);
        setProducts([]);
        setError(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void fetchProducts();

    return () => controller.abort();
  }, []);

  const increasedProducts = INCREASED_PRODUCTS.map((item) =>
    getPriceProduct(item, products)
  );

  const decreasedProducts = DECREASED_PRODUCTS.map((item) =>
    getPriceProduct(item, products)
  );

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 px-4 pb-10 pt-7 sm:px-6 lg:px-8">
      {error && (
        <div
          className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800"
          role="status"
        >
          বাজারদরের তথ্য পাওয়া যায়নি। API সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
        </div>
      )}

      {loading && (
        <p className="text-sm text-gray-500">
          বাজারদরের তথ্য লোড হচ্ছে...
        </p>
      )}

      <PriceSection
        title="আজ দাম বেড়েছে"
        subtitle="গতকালের তুলনায় দাম বৃদ্ধি পাওয়া পণ্য"
        products={increasedProducts}
        direction="up"
      />

      <PriceSection
        title="আজ দাম কমেছে"
        subtitle="গতকালের তুলনায় দাম হ্রাস পাওয়া পণ্য"
        products={decreasedProducts}
        direction="down"
      />
    </div>
  );
}
