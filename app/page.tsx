
import Navbar from "@/components/navbar/Navbar";
import Banner from "@/components/Banner";
import PriceSections from "@/components/PriceSections";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f0f5ef]">
        <Banner />
        <PriceSections />
      </main>
      <Footer />
    </>
  );
}

