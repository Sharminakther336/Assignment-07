
import Navbar from "@/components/navbar/Navbar";
import Banner from "@/components/Banner";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f0f5ef]">
        <Banner />

        <section
          id="products"
          className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8"
        >
          <h2 className="text-xl font-bold text-[#202a22] sm:text-2xl">
            আজকের বাজারের পণ্য
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            পণ্যের তালিকা এখানে যোগ করা হবে।
          </p>
        </section>
      </main>
    </>
  );
}

