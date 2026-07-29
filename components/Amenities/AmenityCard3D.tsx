"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  title: string;
  desc: string;
  index: number;
  icon: string;
};

export default function AmenityCard3D({ title, desc, index, icon }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(
      card,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  }, [index]);

  const handleHover = (entering: boolean) => {
    gsap.to(cardRef.current, {
      y: entering ? -6 : 0,
      scale: entering ? 1.02 : 1,
      duration: 0.4,
      ease: "power2.out",
    });
    gsap.to(iconRef.current, {
      scale: entering ? 1.15 : 1,
      rotate: entering ? 5 : 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
    gsap.to(borderRef.current, {
      opacity: entering ? 1 : 0,
      duration: 0.3,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
      className="group relative overflow-hidden rounded-2xl bg-luxury-surface/40 p-8 backdrop-blur-sm will-change-transform"
      style={{ opacity: 0 }}
    >
      <div
        ref={borderRef}
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-luxury-gold/20 to-transparent opacity-0 transition-opacity"
      />
      <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-luxury-gold/5 blur-2xl" />

      <div className="relative z-10">
        <div
          ref={iconRef}
          className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-luxury-gold/10 text-2xl will-change-transform"
        >
          {icon}
        </div>

        <h3 className="font-serif text-xl text-luxury-cream">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-white/50">{desc}</p>
      </div>
    </div>
  );
}
