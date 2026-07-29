"use client";

import { useRef } from "react";
import gsap from "gsap";

type Props = {
  quote: string;
  author: string;
  title: string;
  active: boolean;
};

export default function QuoteCard3D({ quote, author, title, active }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cardRef.current, {
      rotateY: x * 6,
      rotateX: -y * 6,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`mx-auto max-w-2xl cursor-default rounded-3xl bg-luxury-surface/40 p-10 backdrop-blur-sm transition-all duration-700 will-change-transform md:p-14 ${
        active
          ? "scale-100 opacity-100"
          : "pointer-events-none scale-95 opacity-0"
      }`}
      style={{ perspective: "1000px" }}
    >
      <div className="mb-6 text-5xl text-luxury-gold/30">&ldquo;</div>
      <p className="text-lg leading-relaxed text-luxury-cream/90 md:text-xl">
        {quote}
      </p>
      <div className="mt-8 h-px w-12 bg-luxury-gold/40" />
      <p className="mt-4 font-serif text-lg text-luxury-gold">{author}</p>
      <p className="mt-1 text-xs uppercase tracking-widest text-white/30">
        {title}
      </p>
    </div>
  );
}
