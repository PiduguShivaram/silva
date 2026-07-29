"use client";

import dynamic from "next/dynamic";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-black" />,
});

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <HeroScene />

      <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/[0.03] backdrop-blur-md">
        <div className="pointer-events-none flex flex-col items-center px-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 px-10 py-12 backdrop-blur-xl sm:px-16 sm:py-16">
            <h1 className="select-none text-center text-[clamp(4.5rem,20vw,14rem)] font-black leading-none tracking-tighter text-white/25">
              SILVA
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
