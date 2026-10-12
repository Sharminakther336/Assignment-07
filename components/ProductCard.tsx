
"use client";

import type { Product } from "@/data/products";

function formatNumber(value: number) {
  return value.toLocaleString("bn-BD", {
    maximumFractionDigits: 1,
  });
}

function getUnit(unit: string) {
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

  return units[unit.toLowerCase()] ?? unit;
}

function getProductIcon(product: Product): string {
  const slug = String(product.slug ?? "").toLowerCase();
  const name = String(product.nameBn ?? "").toLowerCase();
  const key = `${slug} ${name}`;

  const icons: [string[], string][] = [
    [["dherosh", "ঢেঁড়স", "ঢেঁড়স", "okra"], "🟢",],
    [["ada", "ginger", "আদা"], "🫚"],
    [["kacha-morich", "kaccha-morich", "কাঁচামরিচ"], "🌶️"],
    [["morich", "chili", "chilli", "মরিচ"], "🌶️"],
    [["roshun", "garlic", "রসুন"], "🧄"],
    [["peyaj", "onion", "পেঁয়াজ", "পেঁয়াজ"], "🧅"],
    [["begun", "eggplant", "বেগুন"], "🍆"],
    [["alu", "potato", "আলু"], "🥔"],
    [["chal", "rice", "চাল"], "🍚"],
    [["mosur", "masoor", "মসুর"], "🫘"],
    [["mug", "mung", "মুগ"], ""],
    [["chola", "chhola", "ছোলা"], "🫘"],
    [["dal", "ডাল"], "dal"],
    [["shorisha", "mustard", "সরিষা"], "🛢️"],
    [["palm", "পাম"], "🛢️"],
    [["tel", "oil", "তেল"], "🛢️"],
    [["mach", "fish", "মাছ"], "🐟"],
    [["dim", "egg", "ডিম"], "🥚"],
    [["dudh", "milk", "দুধ"], "🥛"],
    [["doi", "yogurt", "দই"], "🥣"],
    [["mangsho", "meat", "মাংস"], "🥩"],
    [["chicken", "মুরগি"], "🍗"],
    [["tomato", "টমেটো"], "🍅"],
    [["banana", "কলা"], "🍌"],
    [["mango", "আম"], "🥭"],
    [["lebu", "lemon", "লেবু"], "🍋"],
    [["shosha", "cucumber", "শসা"], "🥒"],
    [["lobon", "salt", "লবণ"], "🧂"],
    [["chini", "sugar", "চিনি"], "🍚"],
    [["dhanepata", "ধনেপাতা"], "🍃"],
  ];

  const matched = icons.find(([words]) =>
    words.some((word) => key.includes(word.toLowerCase()))
  );

  if (matched) return matched[1];

  const apiIcon = String(product.image ?? "").trim();

  if (
    apiIcon &&
    apiIcon !== "null" &&
    apiIcon !== "undefined" &&
    !/^https?:\/\//i.test(apiIcon) &&
    !apiIcon.startsWith("/")
  ) {
    return apiIcon;
  }

  const categoryIcon = String(product.categoryIcon ?? "").trim();

  if (
    categoryIcon &&
    categoryIcon !== "null" &&
    categoryIcon !== "undefined" &&
    !/^https?:\/\//i.test(categoryIcon)
  ) {
    return categoryIcon;
  }

  return "🛒";
}

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  const today = Number(product.today ?? 0);
  const yesterday = Number(product.yesterday ?? 0);

  const difference = today - yesterday;

  const percentage =
    yesterday > 0
      ? (Math.abs(difference) / yesterday) * 100
      : 0;

  const direction =
    difference > 0 ? "up" : difference < 0 ? "down" : "same";

  const productName = String(product.nameBn ?? "পণ্য");
  const icon = getProductIcon(product);
  const imageUrl = String(product.image ?? "").trim();

  const isRemoteImage = /^https?:\/\//i.test(imageUrl);
  const isLocalImage = imageUrl.startsWith("/");
  const hasImage = isRemoteImage || isLocalImage;

  return (
    <article className="relative flex min-h-[120px] items-start gap-3 rounded-[13px] border border-[#e1e9e0] bg-[#fbfdfb] p-3 transition-shadow hover:shadow-md">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f0f5ef]">
        {hasImage ? (
          <>
            <img
              src={imageUrl}
              alt={productName}
              className="h-10 w-10 object-contain"
              onError={(event) => {
                event.currentTarget.style.display = "none";
                const fallback =
                  event.currentTarget.nextElementSibling as HTMLElement | null;

                if (fallback) {
                  fallback.style.display = "flex";
                }
              }}
            />

            <span
              className="h-full w-full items-center justify-center text-[30px] leading-none"
              role="img"
              aria-label={productName}
              style={{ display: "none" }}
            >
              {icon}
            </span>
          </>
        ) : (
          <span
            className="flex h-full w-full items-center justify-center text-[30px] leading-none"
            role="img"
            aria-label={productName}
          >
            {icon}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-bold text-[#253128]">
          {productName}
        </h3>

        <p className="text-xs text-[#727d74]">
          প্রতি {getUnit(String(product.unit ?? "কেজি"))}
        </p>

        <p className="mt-2 text-xs text-[#626b63]">আজকের দাম</p>

        <p className="text-sm font-extrabold text-[#202a22]">
          ৳{formatNumber(today)}
        </p>

        <p className="mt-1 text-[11px] text-[#727d74]">
          গতকাল: ৳{formatNumber(yesterday)}
        </p>
      </div>

      <span
        className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${
          direction === "up"
            ? "bg-red-50 text-red-600"
            : direction === "down"
              ? "bg-green-50 text-green-600"
              : "bg-gray-100 text-gray-600"
        }`}
      >
        {direction === "up"
          ? `▲ ${formatNumber(percentage)}%`
          : direction === "down"
            ? `▼ ${formatNumber(percentage)}%`
            : "— ০%"}
      </span>
    </article>
  );
}




