
export default function Footer() {
  return (
    <footer className="w-full border-t border-[#e3eae3] bg-[#fbfdfb]">
      <div className="mx-auto flex min-h-[56px] w-full max-w-[1440px] flex-col items-center justify-between gap-2 px-5 py-4 text-center sm:flex-row sm:gap-4 sm:px-8 lg:px-[60px]">
        <p className="text-[11px] font-normal leading-5 text-[#536153] sm:text-xs">
          বাজার দর — প্রয়োজনীয় পণ্যের দামের এক নজরে।
        </p>
        <p className="text-[11px] font-normal leading-5 text-[#536153] sm:text-xs">
          সকল দাম সম্ভাব্য; বাজার অবস্থার উপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
