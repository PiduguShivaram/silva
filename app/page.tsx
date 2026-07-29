import AmenitiesSection from "@/components/AmenitiesSection";
import BookSection from "@/components/BookSection";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import RoomsSection from "@/components/RoomsSection";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <RoomsSection />
      <AmenitiesSection />
      <BookSection />
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-white/40">
        © {new Date().getFullYear()} Aurelia Grand Hotel. All rights reserved.
      </footer>
    </main>
  );
}
