
"use client";

import { products } from "@/data/products";
import type { Product } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const increasedOrder = [
  "peyaj",
  "ada",
  "begun",
  "rui-mach",
  "dim",
  "mokhhan",
];

const decreasedOrder = [
  "kaccha-moric",
  "roshun",
  "alu",
  "katla-mach",
  "hanser-mangsho",
  "khasir-mangsho",
];

const increased: Product[] = increasedOrder
  .map((slug) => products.find((product) => product.slug === slug))
  .filter(
    (product): product is Product =>
      product !== undefined && product.today > product.yesterday
  );

const decreased: Product[] = decreasedOrder
  .map((slug) => products.find((product) => product.slug === slug))
  .filter(
    (product): product is Product =>
      product !== undefined && product.today < product.yesterday
  );

type SectionProps = {
  title: string;
  direction?: "up" | "down";
  items: Product[];
  subtitle?: string;
};

function Section({
  title,
  direction,
  items,
  subtitle,
}: SectionProps) {
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

      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-[#e1e9e0] bg-white p-4 text-sm text-[#727d74]">
          এই মুহূর্তে কোনো পণ্যের দাম পরিবর্তন হয়নি।
        </p>
      )}
    </section>
  );
}

export default function PriceSections() {
  return (
    <div className="mx-auto w-full max-w-[836px] space-y-7 bg-[#f0f5ef] px-4 pb-10 pt-6 sm:px-0">
      <Section
        title="আজ দাম বেড়েছে"
        direction="up"
        items={increased}
        subtitle="গতকালের তুলনায় দাম বৃদ্ধি পাওয়া পণ্য"
      />

      <Section
        title="আজ দাম কমেছে"
        direction="down"
        items={decreased}
        subtitle="গতকালের তুলনায় দাম হ্রাস পাওয়া পণ্য"
      />

      <Section
        title="সব পণ্য"
        items={products}
        subtitle={`মোট ${products.length}টি পণ্য দেখানো হচ্ছে`}
      />
    </div>
  );
}
