
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Banner() {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Intl.DateTimeFormat("bn-BD", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Dhaka",
      }).format(new Date())
    );
  }, []);

  return (
    <section className="bg-[#f0f5ef] px-4 py-5 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex min-h-[250px] flex-col items-center justify-between gap-5 overflow-hidden rounded-2xl border border-[#e1e9e0] bg-[#fbfdfb] px-5 py-7 shadow-sm sm:min-h-[270px] sm:flex-row sm:px-8 lg:px-10">
          <div className="w-full sm:max-w-[68%]">
            <span className="inline-flex rounded-full bg-[#e0f3e6] px-3 py-1 text-xs font-semibold text-[#078a45] sm:text-sm">
              {date || "বাংলাদেশের বাজার"}
            </span>

            <h1 className="mt-3 text-2xl font-extrabold leading-snug text-[#202a22] sm:text-3xl lg:text-4xl">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#687169] sm:text-base">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম —
              বাজারের হালনাগাদ তথ্য, সর্বনিম্ন-সর্বোচ্চ দর এবং
              প্রতিদিনের দামের পরিবর্তন এক জায়গায়।
            </p>

            <Link
              href="#products"
              className="mt-5 inline-flex items-center rounded-lg bg-[#078a45] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#066f38]"
            >
              সব পণ্য দেখুন <span className="ml-2">→</span>
            </Link>
          </div>

          <div className="flex w-full shrink-0 justify-center sm:w-[30%]">
            <Image
              src="/bazar-hero.png"
              alt="বাজারের পণ্যে ভরা ঝুড়ি"
              width={315}
              height={263}
              priority
              className="h-auto w-[190px] object-contain sm:w-[210px] lg:w-[245px]"
              sizes="(max-width: 640px) 190px, (max-width: 1024px) 210px, 245px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
