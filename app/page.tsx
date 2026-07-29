"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import RoomsSection from "@/components/Rooms/RoomsSection";
import AmenitiesSection from "@/components/Amenities/AmenitiesSection";
import GallerySection from "@/components/Gallery/GallerySection";
import LocationSection from "@/components/Location/LocationSection";
import TestimonialsSection from "@/components/Testimonials/TestimonialsSection";
import BookSection from "@/components/BookSection";
import StatsSection from "@/components/StatsSection";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";

const SmoothScrollProvider = dynamic(
  () => import("@/lib/smooth-scroll"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <SmoothScrollProvider>
        <main>
          <Navbar />
          <Hero />
          <StatsSection />
          <RoomsSection />
          <AmenitiesSection />
          <GallerySection />
          <TestimonialsSection />
          <LocationSection />
          <BookSection />
          <Footer />
        </main>
      </SmoothScrollProvider>
    </>
  );
}
