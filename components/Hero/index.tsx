"use client";

import dynamic from "next/dynamic";
import HeroContent from "./HeroContent";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-luxury-bg" />,
});

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-luxury-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-bg via-transparent to-luxury-bg/80" />
      <HeroScene />

      <div className="absolute inset-0 bg-gradient-to-t from-luxury-bg via-transparent to-luxury-bg/20" />

      <HeroContent />
    </section>
  );
}
