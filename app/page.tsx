import Navbar from "@/components/navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            BazarDor
          </h1>

          <p className="mt-3 text-base text-gray-600 sm:text-lg">
            Fresh products at the right price.
          </p>
        </div>
      </main>
    </>
  );
}
